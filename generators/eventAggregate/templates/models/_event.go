package models

type Event struct {
	EventId     int64 `sql:",unique"`
	AggregateId int64 ``
	EventType   string
	Data        string
}
