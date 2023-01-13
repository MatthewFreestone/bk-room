from datetime import datetime

def room_num_to_id(room_num: str):
    lookup = {
        # TODO - add more rooms
        "2125": 29,
        "2127": 30,
        "2130": 31,
        "2128": 32,
    }
    return lookup.get(room_num, room_num)

def date_to_str(date: datetime):
    return date.strftime("%Y-%m-%d")

def str_to_date(date: str):
    return datetime.strptime(date, "%Y-%m-%d")