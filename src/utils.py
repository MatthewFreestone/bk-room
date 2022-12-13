def room_num_to_id(room_num: str):
    lookup = {
        # TODO - add more rooms
        "2125": 29,
        "2127": 30,
        "2130": 31,
        "2128": 32,
    }
    return lookup.get(room_num, room_num)
