from datetime import datetime


def room_num_to_id(room_num: str):
    lookup = {'2116': 24, '2118': 26, '2120': 27, '2125': 29, '2127': 30, '2130': 31, '2128': 32, '2132': 33, '2135': 34, '2137': 35, '2145': 36, '2147': 37,
              '2153': 38, '2159': 40, '2161': 41, '2162': 42, '2164': 43, '2166': 44, '2168': 45, '2170': 46, '2174': 48, '2143': 49, '2151': 50, '2157': 51}
    return lookup.get(room_num, room_num)


def date_to_str(date: datetime):
    return date.strftime("%Y-%m-%d")


def str_to_date(date: str):
    return datetime.strptime(date, "%Y-%m-%d")
