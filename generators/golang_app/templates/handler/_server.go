package handler

import (
	"context"
	"fmt"
	"<%=goModuleName%>/db"
	pb "<%=goModuleName%>/proto/<%=proto%>"
)

// Server 事件驱动服务间流程控制方法，提供基本的数据库操作方法
type Server struct {
	pb.<%=protoCamelCapitalize%>Server
}

// CreateAggregate 新建聚合，返回聚合Id
func (s *Server) CreateAggregate(ctx context.Context, req *pb.CreateAggregateRequest) (*pb.CreateAggregateResponse, error) {
	stmt, _ := db.Db.Prepare(`INSERT INTO aggregate (aggregate_type, data) VALUES (?, ?)`)
	defer stmt.Close()
	ret, err := stmt.Exec(req.GetAggregateType(), req.GetData())
	if err != nil {
		fmt.Printf("insert data error: %v\n", err)
		return nil, err
	}
	LastInsertId, _ := ret.LastInsertId()
	return &pb.CreateAggregateResponse{Id: LastInsertId}, nil
}

// CreateEvent 新建Event的方法，需要提供聚合Id
func (s *Server) CreateEvent(ctx context.Context, req *pb.CreateEventRequest) (*pb.CreateEventResponse, error) {
	stmt, _ := db.Db.Prepare(`INSERT INTO event (aggregate_id, event_type, data) VALUES (?, ?, ?)`)
	defer stmt.Close()
	ret, err := stmt.Exec(req.GetAggregateId(), req.GetEventType(), req.GetData())
	if err != nil {
		fmt.Printf("insert data error: %v\n", err)
		return nil, err
	}
	LastInsertId, _ := ret.LastInsertId()
	return &pb.CreateEventResponse{EventId: LastInsertId}, nil
}
