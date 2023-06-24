import json

import requests
from bson.objectid import ObjectId

import pymongo





def database_conn():
    
    # mongodb+srv://Diamond:<password>@cluster0.hvjll3u.mongodb.net/?retryWrites=true&w=majority
    client = pymongo.MongoClient("mongodb+srv://Diamond:root@cluster0.hvjll3u.mongodb.net/?retryWrites=true&w=majority")
    return client['Diamond']
# TIInmlOqGZhRMXdK
db = database_conn()

def futur_expo(user_id):
    coll = db['Users']
    userbet = db['betrecords']
    admintrasaction = db['admintransactions']

    user_data = list(coll.find({'_id': ObjectId(user_id)}))
    pl = 0
    leader = list(admintrasaction.find({'user_id': ObjectId(user_id)}))
    for trans_data in leader:
        if trans_data['userbet_id'] != None:
            pl += trans_data['amount']

    if len(user_data) > 0:
        user_id = ObjectId(user_data[0]['_id'])
        eid_li = []
        event_expo_li = []
        eid = list(userbet.find({'user_id': ObjectId(user_id), 'status': 'pending'}, {"_id": 0, "event_id": 1}))

        for seid in eid:
            if seid['event_id'] not in eid_li:
                eid_li.append(seid['event_id'])
        for ids in eid_li:
            bets = list(
                userbet.find({'user_id': ObjectId(user_id), "bet_on": "odds", "event_id": ids, "status": "pending"}))
            profit12 = 0
            profit13 = 0
            profit14 = 0
            if len(bets) > 0:
                for bet in bets:
                    if bet['profit_team'] == "teamone" and bet["team_name"] != "The Draw" and bet["bet_on"] == "odds":
                        if bet["bet_type"] == "back":
                            profit12 += float(bet["profit"])
                            profit13 += float(bet["loss"])
                            profit14 += float(bet["loss"]) if bet['draw_found'] == "yes" else 0
                        else:
                            profit12 += float(bet["profit"])
                            profit13 += float(bet["loss"])
                            profit14 += float(bet["profit"]) if bet['draw_found'] == "yes" else 0
                    elif bet['profit_team'] == "teamtwo" and bet["team_name"] != "The Draw" and bet[
                        "bet_on"] == "odds":
                        if bet["bet_type"] != "lay":
                            profit12 += float(bet["loss"])
                            profit13 += float(bet["profit"])
                            profit14 += float(bet["loss"]) if bet['draw_found'] == "yes" else 0
                        else:
                            profit12 += float(bet["loss"])
                            profit13 += float(bet["profit"])
                            profit14 += float(bet["profit"]) if bet['draw_found'] == "yes" else 0
                    else:
                        if bet['bet_on'] == "odds" and bet["team_name"] == "The Draw":
                            if bet["bet_type"] != "lay":
                                profit12 += float(bet["loss"])
                                profit13 += float(bet["loss"])
                                profit14 += float(bet["profit"]) if bet['draw_found'] == "yes" else 0
                            else:
                                profit12 += float(bet["profit"])
                                profit13 += float(bet["profit"])
                                profit14 += float(bet["loss"]) if bet['draw_found'] == "yes" else 0
            odds_expo_li = [profit12, profit13, profit14]
            event_expo_li.append(min(odds_expo_li))

        for ids in eid_li:
            teamone_profit_bets = list(
                userbet.aggregate([{'$match': {'user_id': ObjectId(user_id), 'status': 'pending',
                                               "profit_team": "teamone", "event_id": ids,
                                               "bet_on": "bookmaker"}}, {
                                       "$group": {"_id": 0,
                                                  "stake": {"$sum": {'$toInt': '$stake'}},
                                                  "expo": {"$sum": {'$toInt': '$exposure'}},
                                                  "profit": {"$sum": {'$toInt': '$profit'}},
                                                  "loss": {"$sum": {'$toInt': '$loss'}}}}]))
            teamone_profit = teamone_profit_bets[0]['profit'] if len(teamone_profit_bets) > 0 else 0
            teamone_loss_bets = list(
                userbet.aggregate([{'$match': {'user_id': ObjectId(user_id), 'status': 'pending',
                                               "loss_team": "teamone", "event_id": ids,
                                               "bet_on": "bookmaker"}}, {
                                       "$group": {"_id": 0,
                                                  "stake": {"$sum": {'$toInt': '$stake'}},
                                                  "expo": {"$sum": {'$toInt': '$exposure'}},
                                                  "profit": {"$sum": {'$toInt': '$profit'}},
                                                  "loss": {"$sum": {'$toInt': '$loss'}}}}]))
            teamone_loss = teamone_loss_bets[0]['loss'] if len(teamone_loss_bets) > 0 else 0
            t1_exp = teamone_profit + teamone_loss
            teamtwo_profit_bets = list(
                userbet.aggregate([{'$match': {'user_id': ObjectId(user_id), 'status': 'pending',
                                               "profit_team": "teamtwo", "event_id": ids,
                                               "bet_on": "bookmaker"}}, {
                                       "$group": {"_id": 0,
                                                  "stake": {"$sum": {'$toInt': '$stake'}},
                                                  "expo": {"$sum": {'$toInt': '$exposure'}},
                                                  "profit": {"$sum": {'$toInt': '$profit'}},
                                                  "loss": {"$sum": {'$toInt': '$loss'}}}}]))
            teamtwo_profit = teamtwo_profit_bets[0]['profit'] if len(teamtwo_profit_bets) > 0 else 0
            teamtwo_loss_bets = list(
                userbet.aggregate([{'$match': {'user_id': ObjectId(user_id), 'status': 'pending',
                                               "loss_team": "teamtwo", "event_id": ids,
                                               "bet_on": "bookmaker"}}, {
                                       "$group": {"_id": 0,
                                                  "stake": {"$sum": {'$toInt': '$stake'}},
                                                  "expo": {"$sum": {'$toInt': '$exposure'}},
                                                  "profit": {"$sum": {'$toInt': '$profit'}},
                                                  "loss": {"$sum": {'$toInt': '$loss'}}}}]))
            teamtwo_loss = teamtwo_loss_bets[0]['loss'] if len(teamtwo_loss_bets) > 0 else 0
            t2_exp = teamtwo_profit + teamtwo_loss

            if t1_exp < 0 and t2_exp < 0:
                eventexpo = min([t1_exp, t2_exp])
            elif t1_exp < 0:
                eventexpo = t1_exp
            elif t2_exp < 0:
                eventexpo = t2_exp
            else:
                eventexpo = 0
            event_expo_li.append(eventexpo)

        if len(event_expo_li) > 0:
            main_expo = 0
            for eidexpos in event_expo_li:
                # print(eidexpos)
                main_expo += eidexpos
        else:
            main_expo = 0

        #        url = "http://83.136.248.102/fancyexposure"
        #       body = {
        #          "user_id": str(user_data[0]['_id'])
        #     }
        #    fancy_expo_data = requests.request("POST", url, json=body)
        #   fancy_expo = json.loads(fancy_expo_data.text)['fancy_exposure']
        # print(fancy_expo)
        fancy_expo = 0
        total_expo = abs(main_expo) + fancy_expo
    else:
        total_expo = 0
    return total_expo


def updatesession(user, sessionid):
    coll = db['Users']
    coll.update_one({'username': user}, {"$inc": {'session_value': 1}, '$set': {'session_id': sessionid}})
    return


def get_token():
    tokurl = 'http://94.237.61.162:8080/Diamond/GetToken'
    response = requests.request("GET", tokurl)
    final_response = json.loads(response.text)
    bet_token = final_response["token"]
    return bet_token


def get_marktId(bet_token, match_id):
    mrkid_url = 'http://94.237.61.162:8080/Diamond/GetMarketId'
    id_payload = json.dumps({"token": bet_token, "eventId": match_id})

    id_response = requests.request("POST", mrkid_url, data=id_payload)

    mrkid = json.loads(id_response.text)

    if 'msg' not in mrkid:

        if mrkid['marketId'] != '':
            response = mrkid['marketId']
        else:
            response = "nodata"

    else:
        response = "unAuthorized"

    return response


def marketbook(bet_token, match_id, marketId, event_type_id):
    marketbook_url = 'http://35.178.140.195/odds'
    book_payload = {"event_type_id": event_type_id, "market_id": marketId}
    # print(book_payload)

    #    marketbook_url = 'http://94.237.61.162:8080/Diamond/GetMarketBook'
    #    book_payload = json.dumps(
    #        {"token": bet_token, "eventId": match_id, "marketId": marketId})
    try:
        book_response = requests.request("POST", marketbook_url, json=book_payload)
    except:
        book_response = ''

    if book_response.status_code == 200:
        market_odds = json.loads(book_response.text)
        market_odds.update({"bookmake": [
            {
                "runners": []
            }
        ],
            "session": []})
    else:
        marketbook_url = 'http://94.237.61.162:8080/Diamond/GetMarketBook'
        book_payload = json.dumps(
            {"token": bet_token, "eventId": match_id, "marketId": marketId})
        try:
            book_response = requests.request("POST", marketbook_url, data=book_payload)
        except:
            book_response = ''
        if book_response.status_code == 200:
            market_odds = json.loads(book_response.text)
        else:
            market_odds = "nodata"

    return market_odds


def exposure(fun_user_id):
    try:
        userbet = db['userbets']
        user = db['Users']
        admintrasaction = db['admintransactions']
        body_user_id = fun_user_id
        user_data = list(user.find({'_id': ObjectId(body_user_id)}))
        pl = 0
        leader = list(admintrasaction.find({'user_id': ObjectId(body_user_id)}))
        for trans_data in leader:
            if trans_data['userbet_id'] != None:
                # print(trans_data)
                pl += trans_data['amount']

        if len(user_data) > 0:
            user_id = ObjectId(user_data[0]['_id'])
            eid_li = []
            event_expo_li = []
            eid = list(userbet.find({'user_id': ObjectId(user_id), 'status': 'pending'}, {"_id": 0, "event_id": 1}))

            if len(eid) > 0:

                for seid in eid:
                    if seid['event_id'] not in eid_li:
                        eid_li.append(seid['event_id'])
                for ids in eid_li:
                    bets = list(userbet.find(
                        {'user_id': ObjectId(user_id), "bet_on": "odds", "event_id": ids, "status": "pending"}))
                    profit12 = 0
                    profit13 = 0
                    profit14 = 0
                    if len(bets) > 0:
                        for bet in bets:
                            if bet['profit_team'] == "teamone" and bet["team_name"] != "The Draw" and bet[
                                "bet_on"] == "odds":
                                if bet["bet_type"] == "back":
                                    profit12 += float(bet["profit"])
                                    profit13 += float(bet["loss"])
                                    profit14 += float(bet["loss"]) if bet['draw_found'] == "yes" else 0
                                else:
                                    profit12 += float(bet["profit"])
                                    profit13 += float(bet["loss"])
                                    profit14 += float(bet["profit"]) if bet['draw_found'] == "yes" else 0
                            elif bet['profit_team'] == "teamtwo" and bet["team_name"] != "The Draw" and bet[
                                "bet_on"] == "odds":
                                if bet["bet_type"] != "lay":
                                    profit12 += float(bet["loss"])
                                    profit13 += float(bet["profit"])
                                    profit14 += float(bet["loss"]) if bet['draw_found'] == "yes" else 0
                                else:
                                    profit12 += float(bet["loss"])
                                    profit13 += float(bet["profit"])
                                    profit14 += float(bet["profit"]) if bet['draw_found'] == "yes" else 0
                            else:
                                if bet['bet_on'] == "odds" and bet["team_name"] == "The Draw":
                                    if bet["bet_type"] != "lay":
                                        profit12 += float(bet["loss"])
                                        profit13 += float(bet["loss"])
                                        profit14 += float(bet["profit"]) if bet['draw_found'] == "yes" else 0
                                    else:
                                        profit12 += float(bet["profit"])
                                        profit13 += float(bet["profit"])
                                        profit14 += float(bet["loss"]) if bet['draw_found'] == "yes" else 0
                    odds_expo_li = [profit12, profit13, profit14]
                    event_expo_li.append(min(odds_expo_li))

                for ids in eid_li:
                    # print(ids)
                    teamone_profit_bets = list(
                        userbet.aggregate([{'$match': {'user_id': ObjectId(user_id), 'status': 'pending',
                                                       "profit_team": "teamone", "event_id": ids,
                                                       "bet_on": "bookmaker"}}, {
                                               "$group": {"_id": 0,
                                                          "stake": {"$sum": {'$toInt': '$stake'}},
                                                          "expo": {"$sum": {'$toInt': '$exposure'}},
                                                          "profit": {"$sum": {'$toInt': '$profit'}},
                                                          "loss": {"$sum": {'$toInt': '$loss'}}}}]))
                    teamone_profit = teamone_profit_bets[0]['profit'] if len(teamone_profit_bets) > 0 else 0
                    teamone_loss_bets = list(
                        userbet.aggregate([{'$match': {'user_id': ObjectId(user_id), 'status': 'pending',
                                                       "loss_team": "teamone", "event_id": ids,
                                                       "bet_on": "bookmaker"}}, {
                                               "$group": {"_id": 0,
                                                          "stake": {"$sum": {'$toInt': '$stake'}},
                                                          "expo": {"$sum": {'$toInt': '$exposure'}},
                                                          "profit": {"$sum": {'$toInt': '$profit'}},
                                                          "loss": {"$sum": {'$toInt': '$loss'}}}}]))
                    teamone_loss = teamone_loss_bets[0]['loss'] if len(teamone_loss_bets) > 0 else 0
                    t1_exp = teamone_profit + teamone_loss
                    teamtwo_profit_bets = list(
                        userbet.aggregate([{'$match': {'user_id': ObjectId(user_id), 'status': 'pending',
                                                       "profit_team": "teamtwo", "event_id": ids,
                                                       "bet_on": "bookmaker"}}, {
                                               "$group": {"_id": 0,
                                                          "stake": {"$sum": {'$toInt': '$stake'}},
                                                          "expo": {"$sum": {'$toInt': '$exposure'}},
                                                          "profit": {"$sum": {'$toInt': '$profit'}},
                                                          "loss": {"$sum": {'$toInt': '$loss'}}}}]))
                    teamtwo_profit = teamtwo_profit_bets[0]['profit'] if len(teamtwo_profit_bets) > 0 else 0
                    teamtwo_loss_bets = list(
                        userbet.aggregate([{'$match': {'user_id': ObjectId(user_id), 'status': 'pending',
                                                       "loss_team": "teamtwo", "event_id": ids,
                                                       "bet_on": "bookmaker"}}, {
                                               "$group": {"_id": 0,
                                                          "stake": {"$sum": {'$toInt': '$stake'}},
                                                          "expo": {"$sum": {'$toInt': '$exposure'}},
                                                          "profit": {"$sum": {'$toInt': '$profit'}},
                                                          "loss": {"$sum": {'$toInt': '$loss'}}}}]))
                    teamtwo_loss = teamtwo_loss_bets[0]['loss'] if len(teamtwo_loss_bets) > 0 else 0
                    t2_exp = teamtwo_profit + teamtwo_loss

                    if t1_exp < 0 and t2_exp < 0:
                        eventexpo = min([t1_exp, t2_exp])
                    elif t1_exp < 0:
                        eventexpo = t1_exp
                    elif t2_exp < 0:
                        eventexpo = t2_exp
                    else:
                        eventexpo = 0
                    event_expo_li.append(eventexpo)
                #                        print(eventexpo)

                if len(event_expo_li) > 0:
                    main_expo = 0
                    for eidexpos in event_expo_li:
                        # print(eidexpos)
                        main_expo += eidexpos
                else:
                    main_expo = 0

                #                    url = "http://83.136.248.102/fancyexposure"
                #                   body = {
                #                      "user_id": str(user_data[0]['_id'])
                #                 }
                #                fancy_expo_data = requests.request("POST", url, json=body)
                #               fancy_expo = json.loads(fancy_expo_data.text)['fancy_exposure']
                fancy_expo = 0
                total_expo = abs(main_expo) + fancy_expo
                available_balance = (user_data[0]['balance'] + pl + int(
                    user_data[0]['casino_profit_loss'])) - total_expo
                futur_exp = futur_expo(user_data[0]['_id'])

                # user_data[0].update({'data_new': total_expo, '_id': str(user_data[0]['_id'])})

                response = {"stat": True, "user_name": user_data[0]['username'],
                            "user_available_balance": int(available_balance),
                            "user_balance": user_data[0]['balance'], "user_pl": pl,
                            "user_exposure": total_expo, "future_expo": futur_exp,
                            "casino_profit_loss": user_data[0]['casino_profit_loss']}
            else:
                futur_exp = futur_expo(user_data[0]['_id'])
                response = {"stat": True, "user_name": user_data[0]['username'],
                            "patnetship": user_data[0]['cricket_partnership_own'],
                            "user_available_balance": int(user_data[0]['balance']) + int(pl) + int(
                                user_data[0]['casino_profit_loss']),
                            "user_balance": int(user_data[0]['balance']), "user_pl": pl,
                            "user_exposure": 0, "future_expo": futur_exp,
                            "casino_profit_loss": user_data[0]['casino_profit_loss']}
        else:
            response = {"stat": False, "user_expo": 0}
    except:
        response = {"stat": False, "user_expo": 0, "test": "except"}

    return response


def bets_api(eid):
    try:
        url = f"https://api.b365api.com/v1/betfair/ex/event?token=33500-pDTYRdxfKNcx1R&event_id={eid}"
        # target_market = payload.get('market_id').split(',')
        data = requests.get(url).json()
        market = []
        for result in data['results']:
            events = []
            for m in result['markets']:
                # if m['marketId'] in target_market:
                if m['description']['marketName'] == "Match Odds":
                    d1 = {
                        'totalAvailable': m['market']['totalAvailable'],
                        'totalMatched': m['market']['totalMatched'],
                        'inplay': m['market']['inplay'],
                        'priceStatus': None,
                        'marketId': m['market']['marketId'],
                        'status': m['market']['marketStatus']
                    }

                    for r in m['runners']:
                        d2 = {
                            'RunnerName': r['description']['runnerName'],
                            'SelectionId': r['selectionId'],
                            'GameStatus': r['state']['status'],
                        }

                        i, j = 1, 1

                        for eb in r['exchange']['availableToBack']:
                            d2[f'BackPrice{i}'] = eb['price']
                            d2[f'BackSize{i}'] = eb['size']
                            i += 1

                        for el in r['exchange']['availableToLay']:
                            d2[f'LayPrice{j}'] = el['price']
                            d2[f'LaySize{j}'] = el['size']
                            j += 1

                        events.append(d2)

                    d1['events'] = events
                    market.append(d1)
                    break

        response = {'market': market, "bookmake": [], "session": []}
    except Exception as e:
        print(e)
        response = {'market': [], "bookmake": [], "session": []}

    return response
