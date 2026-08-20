#!/usr/bin/env python3
"""
校内地图路线查询接口
Campus Map Route Query API

提供 RESTful API 用于查询校园内两点之间的最佳路线
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
from typing import Dict, List, Optional, Tuple
import json
from dataclasses import dataclass, asdict
from enum import Enum
import heapq

app = Flask(__name__)
CORS(app)  # 允许跨域请求


class TransportMode(Enum):
    """交通方式枚举"""
    WALK = "walk"           # 步行
    BICYCLE = "bicycle"     # 自行车
    BUS = "bus"            # 校车


@dataclass
class Location:
    """位置点数据类"""
    id: str
    name: str
    x: float
    y: float
    building_type: str = "general"  # building, dormitory, canteen, library, etc.


@dataclass
class Edge:
    """边数据类"""
    from_node: str
    to_node: str
    distance: float  # 米
    walk_time: float  # 步行时间（分钟）
    bike_time: float  # 骑行时间（分钟）
    bus_route: Optional[str] = None  # 是否有校车路线


@dataclass
class RouteResult:
    """路线结果数据类"""
    success: bool
    message: str
    route: Optional[List[str]] = None
    total_distance: float = 0.0
    total_time: float = 0.0
    transport_mode: str = "walk"
    waypoints: List[Dict] = None


class CampusMap:
    """校园地图类"""
    
    def __init__(self):
        self.locations: Dict[str, Location] = {}
        self.graph: Dict[str, List[Tuple[str, float, float, float, Optional[str]]]] = {}
        self._initialize_campus_data()
    
    def _initialize_campus_data(self):
        """初始化校园地图数据"""
        
        # 添加主要建筑物和地点
        campus_locations = [
            Location("main_gate", "校门", 0, 0, "gate"),
            Location("library", "图书馆", 100, 200, "library"),
            Location("teaching_building_1", "第一教学楼", 150, 100, "building"),
            Location("teaching_building_2", "第二教学楼", 200, 150, "building"),
            Location("dormitory_a", "宿舍A区", 50, 300, "dormitory"),
            Location("dormitory_b", "宿舍B区", 80, 350, "dormitory"),
            Location("canteen", "食堂", 120, 250, "canteen"),
            Location("gym", "体育馆", 250, 200, "sports"),
            Location("lab_building", "实验楼", 180, 50, "building"),
            Location("admin_building", "行政楼", 300, 100, "building"),
            Location("park", "校园公园", 150, 300, "park"),
            Location("hospital", "校医院", 220, 280, "hospital"),
            Location("supermarket", "超市", 90, 220, "shop"),
        ]
        
        for loc in campus_locations:
            self.locations[loc.id] = loc
            self.graph[loc.id] = []
        
        # 添加道路连接（双向）
        roads = [
            # 校门到各区域
            ("main_gate", "teaching_building_1", 180, 2.2, 0.9),
            ("main_gate", "lab_building", 200, 2.4, 1.0),
            
            # 教学区内部
            ("teaching_building_1", "teaching_building_2", 80, 1.0, 0.4),
            ("teaching_building_1", "library", 110, 1.3, 0.5),
            ("teaching_building_2", "gym", 70, 0.8, 0.3),
            ("teaching_building_2", "canteen", 120, 1.4, 0.6),
            
            # 生活区
            ("library", "canteen", 60, 0.7, 0.3),
            ("library", "dormitory_a", 100, 1.2, 0.5),
            ("canteen", "dormitory_a", 50, 0.6, 0.25),
            ("canteen", "dormitory_b", 60, 0.7, 0.3),
            ("dormitory_a", "dormitory_b", 40, 0.5, 0.2),
            ("dormitory_a", "park", 70, 0.8, 0.35),
            ("dormitory_b", "hospital", 140, 1.7, 0.7),
            
            # 其他连接
            ("lab_building", "teaching_building_1", 90, 1.1, 0.45),
            ("lab_building", "admin_building", 130, 1.6, 0.65),
            ("gym", "admin_building", 60, 0.7, 0.3),
            ("gym", "hospital", 80, 1.0, 0.4),
            ("park", "supermarket", 80, 1.0, 0.4),
            ("supermarket", "canteen", 40, 0.5, 0.2),
            ("hospital", "admin_building", 100, 1.2, 0.5),
        ]
        
        # 构建无向图
        for from_node, to_node, distance, walk_time, bike_time in roads:
            self.graph[from_node].append((to_node, distance, walk_time, bike_time, None))
            self.graph[to_node].append((from_node, distance, walk_time, bike_time, None))
    
    def find_shortest_path(
        self, 
        start: str, 
        end: str, 
        mode: TransportMode = TransportMode.WALK
    ) -> Optional[Tuple[List[str], float, float]]:
        """
        使用 Dijkstra 算法查找最短路径
        
        Args:
            start: 起点 ID
            end: 终点 ID
            mode: 交通方式
            
        Returns:
            (路径列表, 总距离, 总时间) 或 None（如果找不到路径）
        """
        if start not in self.graph or end not in self.graph:
            return None
        
        # 根据交通方式选择权重
        def get_weight(edge_data):
            _, distance, walk_time, bike_time, _ = edge_data
            if mode == TransportMode.BICYCLE:
                return bike_time
            else:  # WALK or BUS (bus uses walking for now)
                return walk_time
        
        # Dijkstra 算法
        distances = {node: float('inf') for node in self.graph}
        distances[start] = 0
        previous = {node: None for node in self.graph}
        pq = [(0, start)]
        visited = set()
        
        while pq:
            current_dist, current_node = heapq.heappop(pq)
            
            if current_node in visited:
                continue
            
            visited.add(current_node)
            
            if current_node == end:
                break
            
            for neighbor, distance, walk_time, bike_time, bus_route in self.graph[current_node]:
                if neighbor in visited:
                    continue
                
                edge_data = (neighbor, distance, walk_time, bike_time, bus_route)
                weight = get_weight(edge_data)
                new_dist = current_dist + weight
                
                if new_dist < distances[neighbor]:
                    distances[neighbor] = new_dist
                    previous[neighbor] = current_node
                    heapq.heappush(pq, (new_dist, neighbor))
        
        # 重建路径
        if distances[end] == float('inf'):
            return None
        
        path = []
        current = end
        while current is not None:
            path.append(current)
            current = previous[current]
        path.reverse()
        
        # 计算总距离和总时间
        total_distance = 0
        total_time = 0
        for i in range(len(path) - 1):
            for neighbor, distance, walk_time, bike_time, _ in self.graph[path[i]]:
                if neighbor == path[i + 1]:
                    total_distance += distance
                    if mode == TransportMode.BICYCLE:
                        total_time += bike_time
                    else:
                        total_time += walk_time
                    break
        
        return path, total_distance, total_time
    
    def get_location_info(self, location_id: str) -> Optional[Dict]:
        """获取位置信息"""
        if location_id in self.locations:
            loc = self.locations[location_id]
            return asdict(loc)
        return None
    
    def search_locations(self, keyword: str) -> List[Dict]:
        """搜索位置"""
        results = []
        keyword_lower = keyword.lower()
        for loc in self.locations.values():
            if (keyword_lower in loc.id.lower() or 
                keyword_lower in loc.name.lower() or
                keyword_lower in loc.building_type.lower()):
                results.append(asdict(loc))
        return results


# 创建全局地图实例
campus_map = CampusMap()


@app.route('/api/v1/route', methods=['GET'])
def query_route():
    """
    查询路线接口
    
    Query Parameters:
        - from: 起点（位置ID或名称）
        - to: 终点（位置ID或名称）
        - mode: 交通方式 (walk, bicycle, bus)，默认 walk
    
    Returns:
        JSON 格式的路线信息
    """
    try:
        start = request.args.get('from', '')
        end = request.args.get('to', '')
        mode_str = request.args.get('mode', 'walk').lower()
        
        if not start or not end:
            return jsonify({
                'success': False,
                'message': '缺少必要参数：from 和 to',
                'error_code': 'MISSING_PARAMS'
            }), 400
        
        # 转换交通方式
        try:
            mode = TransportMode(mode_str)
        except ValueError:
            return jsonify({
                'success': False,
                'message': f'无效的交通方式：{mode_str}，支持：walk, bicycle, bus',
                'error_code': 'INVALID_MODE'
            }), 400
        
        # 尝试通过 ID 或名称查找位置
        start_loc = None
        end_loc = None
        
        if start in campus_map.locations:
            start_loc = start
        else:
            # 通过名称搜索
            for loc_id, loc in campus_map.locations.items():
                if start.lower() in loc.name.lower() or start.lower() in loc_id.lower():
                    start_loc = loc_id
                    break
        
        if end in campus_map.locations:
            end_loc = end
        else:
            for loc_id, loc in campus_map.locations.items():
                if end.lower() in loc.name.lower() or end.lower() in loc_id.lower():
                    end_loc = loc_id
                    break
        
        if not start_loc:
            return jsonify({
                'success': False,
                'message': f'未找到起点：{start}',
                'error_code': 'LOCATION_NOT_FOUND',
                'suggestions': campus_map.search_locations(start)
            }), 404
        
        if not end_loc:
            return jsonify({
                'success': False,
                'message': f'未找到终点：{end}',
                'error_code': 'LOCATION_NOT_FOUND',
                'suggestions': campus_map.search_locations(end)
            }), 404
        
        # 查找最短路径
        result = campus_map.find_shortest_path(start_loc, end_loc, mode)
        
        if not result:
            return jsonify({
                'success': False,
                'message': '未找到可行路线',
                'error_code': 'NO_ROUTE'
            }), 404
        
        path, total_distance, total_time = result
        
        # 构建路径详情
        waypoints = []
        for node_id in path:
            loc_info = campus_map.get_location_info(node_id)
            if loc_info:
                waypoints.append(loc_info)
        
        return jsonify({
            'success': True,
            'message': '路线查询成功',
            'data': {
                'route': path,
                'total_distance': round(total_distance, 2),
                'total_time': round(total_time, 2),
                'transport_mode': mode.value,
                'waypoints': waypoints,
                'start': campus_map.get_location_info(start_loc),
                'end': campus_map.get_location_info(end_loc)
            }
        }), 200
    
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'服务器错误：{str(e)}',
            'error_code': 'SERVER_ERROR'
        }), 500


@app.route('/api/v1/locations', methods=['GET'])
def list_locations():
    """
    获取所有位置列表
    
    Query Parameters:
        - type: 可选，按类型筛选 (building, dormitory, canteen, etc.)
        - search: 可选，搜索关键词
    """
    try:
        location_type = request.args.get('type', '')
        search_keyword = request.args.get('search', '')
        
        locations = []
        for loc in campus_map.locations.values():
            loc_dict = asdict(loc)
            
            # 类型筛选
            if location_type and loc.building_type != location_type:
                continue
            
            # 搜索筛选
            if search_keyword:
                keyword_lower = search_keyword.lower()
                if (keyword_lower not in loc.name.lower() and 
                    keyword_lower not in loc.id.lower()):
                    continue
            
            locations.append(loc_dict)
        
        return jsonify({
            'success': True,
            'count': len(locations),
            'data': locations
        }), 200
    
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'服务器错误：{str(e)}'
        }), 500


@app.route('/api/v1/location/<location_id>', methods=['GET'])
def get_location(location_id: str):
    """获取单个位置详情"""
    try:
        loc_info = campus_map.get_location_info(location_id)
        
        if not loc_info:
            return jsonify({
                'success': False,
                'message': f'位置不存在：{location_id}'
            }), 404
        
        return jsonify({
            'success': True,
            'data': loc_info
        }), 200
    
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'服务器错误：{str(e)}'
        }), 500


@app.route('/api/v1/search', methods=['GET'])
def search_locations():
    """
    搜索位置
    
    Query Parameters:
        - q: 搜索关键词（必需）
    """
    try:
        keyword = request.args.get('q', '')
        
        if not keyword:
            return jsonify({
                'success': False,
                'message': '缺少搜索关键词参数：q'
            }), 400
        
        results = campus_map.search_locations(keyword)
        
        return jsonify({
            'success': True,
            'count': len(results),
            'data': results
        }), 200
    
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'服务器错误：{str(e)}'
        }), 500


@app.route('/api/v1/health', methods=['GET'])
def health_check():
    """健康检查接口"""
    return jsonify({
        'status': 'healthy',
        'service': 'campus-map-route-api',
        'version': '1.0.0'
    }), 200


@app.route('/', methods=['GET'])
def index():
    """API 首页"""
    return jsonify({
        'name': '校内地图路线查询 API',
        'version': '1.0.0',
        'description': '提供校园内两点之间的最佳路线查询服务',
        'endpoints': {
            '查询路线': '/api/v1/route?from={起点}&to={终点}&mode={交通方式}',
            '位置列表': '/api/v1/locations?type={类型}&search={关键词}',
            '位置详情': '/api/v1/location/{位置ID}',
            '搜索位置': '/api/v1/search?q={关键词}',
            '健康检查': '/api/v1/health'
        },
        'transport_modes': ['walk', 'bicycle', 'bus'],
        'example': '/api/v1/route?from=main_gate&to=library&mode=walk'
    }), 200


if __name__ == '__main__':
    print("=" * 60)
    print("校内地图路线查询 API 服务启动")
    print("=" * 60)
    print("\n可用接口:")
    print("  GET /                      - API 首页")
    print("  GET /api/v1/route          - 查询路线")
    print("  GET /api/v1/locations      - 位置列表")
    print("  GET /api/v1/location/<id>  - 位置详情")
    print("  GET /api/v1/search         - 搜索位置")
    print("  GET /api/v1/health         - 健康检查")
    print("\n示例:")
    print("  curl 'http://localhost:5000/api/v1/route?from=main_gate&to=library&mode=walk'")
    print("=" * 60)
    
    app.run(host='0.0.0.0', port=5000, debug=False)
