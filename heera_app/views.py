import datetime
import json
from rest_framework.views import APIView
from django.http import JsonResponse
import bcrypt
import boto3
import jwt
import maya
import requests
import requests
from bson.objectid import ObjectId
from django.conf import settings
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render, redirect
from django.views.decorators.csrf import csrf_exempt
from .helperfun import updatesession, get_token, get_marktId, marketbook, exposure, bets_api, database_conn

db = database_conn()
access_key = 'AKIA3B6YE2EVL4Z5IKOJ'
secret_access_key = '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'

s3 = boto3.resource('s3',
                    aws_access_key_id=access_key,
                    aws_secret_access_key=secret_access_key)

jwt_seceret = "THIS IS USED TO SIGN AND VERIFY JWT TOKENS, REPLACE IT WITH YOUR OWN SECRET, IT CAN BE ANY STRING"


def jwt_middleware(get_response):
    def middleware(request):
        if request.path == '/cricket_data/<id>' or request.path == '/match_odds/' or request.path == '/current/' or request.path == '/user_curr_balance/' or request.path == '/casino_transac/' or request.path == '/fancy_position/' or request.path == '/userbetslist/' or request.path == '/user_profit_loss/' or request.path == '/distribution/':
            tok = request.headers.get('Authorization')
            if tok != None:
                try:
                    res = jwt.decode(tok.split(' ')[1],
                                     jwt_seceret,
                                     algorithms=["HS256"])
                    # print(res)
                    # print(request.data)
                    request.user = res

                    response = get_response(request)
                except:
                    response = HttpResponse(json.dumps({"status": 'Unauthorized'}), status=200)
            else:
                response = HttpResponse(
                    json.dumps({"status": 'Missing authentication credentials.', "type": "jwt.noToken"}), status=401)
        else:
            response = get_response(request)
        return response

    return middleware


# <!****************************************************************!>
#                       Jwt Auth Middleware End
# <!****************************************************************!>

def method_chk_middleware(get_response):
    def middleware(request):
        if request.path == '/login/' or request.path == '/match_odds/' or request.path == '/casino_transac/' or request.path == '/fancy_position/' or request.path == '/user_expo/':
            if request.method == 'POST':
                response = get_response(request)
            else:
                response = HttpResponse(json.dumps({"status": 'Method Not Allowed', "Method": request.method}),
                                        status=401, content_type="application/json")
        else:
            response = get_response(request)
        return response

    return middleware


# <!****************************************************************!>
#                       Method Identifier Middleware End
# <!****************************************************************!>

def futur_expo(user_id):
    coll = db['users']
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


# user exposure 
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

        user_id = str(user_data[0]['_id'])

        agg_fancies = db['betrecords'].aggregate(
            [{'$match': {'user_id': {'$eq': ObjectId(user_id)}, 'bet_on': {'$eq': 'fancy'},
                         'status': {'$eq': 'pending'}}}, {
                 '$group': {'_id': '$headname', 'fancy': {
                     '$push': {'no': '$no', 'stake': '$stake', 'no_amount': '$no_amount', 'back_size': '$back_size',
                               'lay_size': '$lay_size'}}}}])

        fancy_expo = 0
        for fancy in agg_fancies:
            exposure = {}
            for _ in range(1001):
                exposure[_] = 0
            for f in fancy['fancy']:
                if f['no'] == 'no':
                    for _ in range(int(f['no_amount'])):
                        exposure[_] += abs(int(f['stake']))
                    for _ in range(int(f['no_amount']), 1001):
                        exposure[_] -= abs(int((int(f['stake']) * int(f['lay_size'])) / 100))
                else:
                    for _ in range(int(f['no_amount'])):
                        exposure[_] -= abs(int(f['stake']))
                    for _ in range(int(f['no_amount']), 1001):
                        exposure[_] += abs(int((int(f['stake']) * int(f['back_size'])) / 100))

            fancy_expo += abs(min(exposure.values()))

        total_expo = abs(main_expo) + fancy_expo
    else:
        total_expo = 0
    return total_expo


@csrf_exempt
def login(req):
    coll = db['users']
    print(coll)
    data = req.body.decode('utf-8')
    if data != '':
        login_cred = json.loads(data)
        user_data = coll.find_one({'username': login_cred['email']})
        if user_data:
            session_id = req.session._get_or_create_session_key()
            if bcrypt.checkpw(login_cred['password'].encode('utf-8'), user_data['hash'].encode('utf-8')):
                updatesession(login_cred['email'], session_id)
                token = jwt.encode({'sub': str(user_data['_id'])}, jwt_seceret, algorithm="HS256").decode('utf-8')
                user_data.update({"token": str(token), "_id": str(user_data['_id'])})
                # print(user_data)

                response = JsonResponse({"success": True, "message": user_data, "session_id": session_id})


            else:
                response = JsonResponse({"success": False, 'message': 'Username or password is incorrect'})


        else:
            response = JsonResponse({"success": False, 'message': 'Username Not Found'})

    else:
        response = JsonResponse({"success": False, 'message': 'Username or password Not Found'})

    return response


# Whole user Details
def userdetails(req):
    coll = db['users']
    user_data = list(coll.find({"_id": ObjectId(req.user['sub'])}, {'_id': 0, "hash": 0}))
    # print(user_data)
    if len(user_data) > 0:
        response = JsonResponse(user_data[0], content_type="application/json")
    else:
        response = HttpResponse(status=404)

    # print(user_data)

    return response


def userCurrentBalanceWithExposure(req):
    coll = db['users']
    #    userbet = db['betrecords']
    userbet = db['userbets']
    admintrasaction = db['admintransactions']

    user_data = list(coll.find({'_id': ObjectId(req.user['sub'])}))
    #    print(user_data)
    pl = 0
    leader = list(admintrasaction.find({'user_id': ObjectId(req.user['sub'])}))
    #    print(leader)
    for trans_data in leader:
        if trans_data['userbet_id'] != None:
            pl += trans_data['amount']
    #    print(pl)
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

        user_id = str(user_data[0]['_id'])

        agg_fancies = db['betrecords'].aggregate(
            [{'$match': {'user_id': {'$eq': ObjectId(user_id)}, 'bet_on': {'$eq': 'fancy'},
                         'status': {'$eq': 'pending'}}}, {
                 '$group': {'_id': '$headname', 'fancy': {
                     '$push': {'no': '$no', 'stake': '$stake', 'no_amount': '$no_amount', 'back_size': '$back_size',
                               'lay_size': '$lay_size'}}}}])

        fancy_expo = 0
        for fancy in agg_fancies:
            exposure = {}
            for _ in range(1001):
                exposure[_] = 0
            for f in fancy['fancy']:
                if f['no'] == 'no':
                    for _ in range(int(f['no_amount'])):
                        exposure[_] += abs(int(f['stake']))
                    for _ in range(int(f['no_amount']), 1001):
                        exposure[_] -= abs(int((int(f['stake']) * int(f['lay_size'])) / 100))
                else:
                    for _ in range(int(f['no_amount'])):
                        exposure[_] -= abs(int(f['stake']))
                    for _ in range(int(f['no_amount']), 1001):
                        exposure[_] += abs(int((int(f['stake']) * int(f['back_size'])) / 100))

            fancy_expo += abs(min(exposure.values()))
        total_expo = abs(main_expo) + fancy_expo

        futur_exp = futur_expo(user_id)

        user_data[0].update({'data_new': total_expo, '_id': str(user_data[0]['_id']),
                             "profit_loss": pl + int(user_data[0]['casino_profit_loss']), "future_expo": futur_exp})

        #        print({'data_new': total_expo, '_id': str(user_data[0]['_id']),
        #                            "profit_loss": pl, "future_expo": futur_exp})

        response = JsonResponse({'success': True, 'message': 'Admin Total2', 'adminlist': user_data},
                                content_type="application/json")

    else:
        response = JsonResponse({'success': False, 'message': 'No Data found'}, content_type="application/json")

    return response


def cricket_data(req, id):
    with open(f"/var/project_workspace/cron_data/{id}.json") as f:
        data = json.load(f)

    return HttpResponse(json.dumps(data))


@csrf_exempt
def match_odds(req):
    data = req.body.decode('utf-8')
    if data != '':
        query_data = json.loads(data)
        match_id = query_data['match_id']
        sport_type = query_data['sport_type']
        if sport_type == 'cricket':
            download_file_bucket = 'crick-inplay-matcha'
            obj = s3.Object(download_file_bucket, f"mbs/{match_id}.json")
            body = obj.get()['Body'].read().decode('UTF-8')
            market_data = json.loads(body)
            response = market_data
        elif sport_type == 'soccer' or sport_type == 'tennis':
            resp_data = bets_api(match_id)
            if resp_data['market']:
                response = resp_data
            else:
                resp_data['market'].append({"status": "CLOSED"})
                response = resp_data

            pass
        else:
            response = "Empty Sport"
    else:
        response = "Query Not Found"

    #    return HttpResponse(json.dumps(response),content_type="application/json")
    return JsonResponse(response, safe=False)


@csrf_exempt
def casino_transac(req):
    cas_tran = db['transactions']
    data = list(cas_tran.find({}, {"_id": 0, "user": 1, "amount": 1, "game_id": 1, "game_code": 1, "balance": 1}))

    if len(data) > 0:
        response = JsonResponse({"status": True, "transactions": data})
    else:
        response = JsonResponse({"status": False, "transactions": "no_data"})

    return response


@csrf_exempt
def maxmin_bet_limit(req):
    limit_db = db['maximumbetlimits']
    body_data = req.body.decode('utf-8')
    if body_data != '':
        match_id = json.loads(body_data)

        data = limit_db.find_one({"event_id": str(match_id['match_id'])},
                                 {"_id": 0, "event_id": 0, "event_name": 0, "createdDate": 0})

        response = JsonResponse({"status": True, "limits": data})
    else:
        response = JsonResponse({"status": False, "limits": "no_data"})

    return response


@csrf_exempt
def fancy_position(req):
    userbet = db['userbets']
    body_data = req.body.decode('utf-8')
    if body_data != '':
        body_data = json.loads(body_data)
        headname = body_data['headname']
        event_type = body_data['event_type']
        user_id = req.user['sub']
        back = list(userbet.aggregate([{'$match': {'user_id': ObjectId(user_id), "team_name": headname,
                                                   "event_type": event_type, 'status': 'pending', "bet_type": "fancy",
                                                   "no": "yes"}},
                                       {"$group": {"_id": 0, "back": {"$sum": {'$toInt': '$stake'}}}}]))
        lay = list(userbet.aggregate([{'$match': {'user_id': ObjectId(user_id), "team_name": headname,
                                                  "event_type": event_type, 'status': 'pending', "bet_type": "fancy",
                                                  "no": "no"}},
                                      {"$group": {"_id": 0, "lay": {"$sum": {'$toInt': '$stake'}}}}]))
        backamt = int(back[0]['back']) if len(back) > 0 else 0
        layamt = int(lay[0]['lay']) if len(lay) > 0 else 0
        total = int(backamt - layamt)
        response = JsonResponse({"user_id": user_id, "headname": headname, "user_postion": total, "stat": True})
    else:
        response = JsonResponse({"stat": True, "msg": "no_data"})
    return response


@csrf_exempt
def userbets(req):
    userbet = db['userbets']
    matchlist = db['manualmatches']
    bet_data = {}
    bets = list(userbet.find({"user_id": ObjectId(req.user['sub']), 'status': 'pending'},
                             {'_id': 0, "event_id": 1, "event_name": 1, "stake": 1}))
    for bet in bets:
        if bet['event_id'] not in bet_data:
            match = matchlist.find_one({"match_id": bet['event_id']})
            bet_data.update({bet['event_id']: {"match_name": match['match_name'], "event_type": match['sport_type'],
                                               "total_bet": 0}})

        bet_data[bet['event_id']].update({"total_bet": bet_data[bet['event_id']]['total_bet'] + 1})

    if len(bets) > 0:
        response = JsonResponse({"stat": True, "msg": "data_found", "bet_record": bet_data})
    else:
        response = JsonResponse({"stat": False, "msg": "no_bets"})

    return response


@csrf_exempt
def user_profit_loss(req):
    userbet = db['userbets']
    matchlist = db['manualmatches']
    admintransaction = db['admintransactions']
    if req.method == "GET":
        bet_data = {}
        bets = list(userbet.find({"user_id": ObjectId(req.user['sub']), 'status': 'completed'},
                                 {'_id': 1, "event_id": 1, "event_name": 1, "stake": 1}))
        for bet in bets:
            if bet['event_id'] not in bet_data:
                match = matchlist.find_one({"match_id": bet['event_id']})
                bet_data.update({bet['event_id']: {"match_name": match['match_name'], "event_type": match['sport_type'],
                                                   "total_bet": 0, "profit_loss": 0}})

            transactions = admintransaction.find_one({"userbet_id": bet['_id']})

            if transactions:
                bet_data[bet['event_id']].update(
                    {"profit_loss": bet_data[bet['event_id']]['profit_loss'] + transactions['amount']})
            bet_data[bet['event_id']].update({"total_bet": bet_data[bet['event_id']]['total_bet'] + 1})

        if len(bets) > 0:
            response = JsonResponse({"stat": True, "msg": "data_found", "bet_record": bet_data})
        else:
            response = JsonResponse({"stat": False, "msg": "no_bets"})
    elif req.method == "POST":
        body_data = req.body.decode('utf-8')
        if body_data != "":
            body_data = json.loads(body_data)
            startdate = body_data['startDate']
            enddate = body_data['endDate']

            sdt = maya.parse(startdate).datetime()
            edt = maya.parse(enddate).datetime()
            bet_data = {}

            bets = list(userbet.find({"user_id": ObjectId(req.user['sub']), 'status': 'completed',
                                      "createdDate": {'$gte': sdt, '$lte': edt}},
                                     {'_id': 1, "event_id": 1, "event_name": 1, "stake": 1, "createdDate": 1}))
            for bet in bets:
                if bet['event_id'] not in bet_data:
                    match = matchlist.find_one({"match_id": bet['event_id']})
                    bet_data.update(
                        {bet['event_id']: {"match_name": match['match_name'], "event_type": match['sport_type'],
                                           "total_bet": 0, "profit_loss": 0}})

                transactions = admintransaction.find_one({"userbet_id": bet['_id']})

                if transactions:
                    bet_data[bet['event_id']].update(
                        {"profit_loss": bet_data[bet['event_id']]['profit_loss'] + transactions['amount']})
                bet_data[bet['event_id']].update({"total_bet": bet_data[bet['event_id']]['total_bet'] + 1})

            if len(bets) > 0:
                response = JsonResponse({"stat": True, "msg": "data_found", "bet_record": bet_data})
            else:
                response = JsonResponse({"stat": False, "msg": "no_bets"})

        else:
            response = JsonResponse({"stat": False, "msg": "empty_body"})

    else:
        response = JsonResponse({"stat": False, "msg": "bad_method"})

    return response


@csrf_exempt
def user_expo(req):
    try:
        print("987")
        userbet = db['userbets']
        #        userbet = db['betrecords']
        user = db['users']
        print(list(user.find({'_id': ObjectId("614845c7bbdd9df6d13c1798")})))
        admintrasaction = db['admintransactions']
        body_data = req.body.decode('utf-8')
        if body_data != "":
            body_data = json.loads(body_data)
            body_user_id = body_data['user_id']
            print(body_user_id,"0909")
            user_data = list(user.find({'_id': ObjectId(body_user_id)}))
            pl = 0
            leader = list(admintrasaction.find({'user_id': ObjectId(body_user_id)}))
            print(user_data,"-----",leader)
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

                    user_id = str(user_data[0]['_id'])

                    agg_fancies = db['betrecords'].aggregate(
                        [{'$match': {'user_id': {'$eq': ObjectId(user_id)}, 'bet_on': {'$eq': 'fancy'},
                                     'status': {'$eq': 'pending'}}}, {
                             '$group': {'_id': '$headname', 'fancy': {
                                 '$push': {'no': '$no', 'stake': '$stake', 'no_amount': '$no_amount',
                                           'back_size': '$back_size',
                                           'lay_size': '$lay_size'}}}}])

                    fancy_expo = 0
                    for fancy in agg_fancies:
                        exposure = {}
                        for _ in range(1001):
                            exposure[_] = 0
                        for f in fancy['fancy']:
                            if f['no'] == 'no':
                                for _ in range(int(f['no_amount'])):
                                    exposure[_] += abs(int(f['stake']))
                                for _ in range(int(f['no_amount']), 1001):
                                    exposure[_] -= abs(int((int(f['stake']) * int(f['lay_size'])) / 100))
                            else:
                                for _ in range(int(f['no_amount'])):
                                    exposure[_] -= abs(int(f['stake']))
                                for _ in range(int(f['no_amount']), 1001):
                                    exposure[_] += abs(int((int(f['stake']) * int(f['back_size'])) / 100))

                        fancy_expo += abs(min(exposure.values()))
                    total_expo = abs(main_expo) + fancy_expo
                    available_balance = (user_data[0]['balance'] + pl + int(
                        user_data[0]['casino_profit_loss'])) - total_expo
                    futur_exp = futur_expo(user_data[0]['_id'])

                    # user_data[0].update({'data_new': total_expo, '_id': str(user_data[0]['_id'])})

                    #                    print({"stat": True, "user_name": user_data[0]['username'],
                    #                                             "user_available_balance": int(available_balance),
                    #                                             "user_balance": user_data[0]['balance'], "user_pl": pl,
                    #                                             "user_exposure": total_expo, "future_expo": futur_exp,
                    #                                             "casino_profit_loss": user_data[0]['casino_profit_loss']})

                    response = JsonResponse({"stat": True, "user_name": user_data[0]['username'],
                                             "user_available_balance": int(available_balance),
                                             "user_balance": user_data[0]['balance'], "user_pl": pl,
                                             "user_exposure": total_expo, "future_expo": futur_exp,
                                             "casino_profit_loss": user_data[0]['casino_profit_loss']}, safe=False)
                else:
                    futur_exp = futur_expo(user_data[0]['_id'])

                    response = JsonResponse({"stat": True, "user_name": user_data[0]['username'],
                                             "user_available_balance": int(user_data[0]['balance']) + int(pl) + int(
                                                 user_data[0]['casino_profit_loss']),
                                             "user_balance": int(user_data[0]['balance']), "user_pl": pl,
                                             "user_exposure": 0, "future_expo": futur_exp,
                                             "casino_profit_loss": user_data[0]['casino_profit_loss']}, safe=False)
            else:
                response = JsonResponse({"stat": False, "user_expo": 0}, safe=False)

        else:
            response = JsonResponse({"stat": False, "user_expo": 0}, safe=False)
    except:
        response = JsonResponse({"stat": False, "user_expo": 0}, safe=False)

    return response


def distribution(req):
    user = db['users']
    # parent_id = "5ffd944b3dcc5a3098f5dd88"
    parent_id = req.user['sub']
    parent = user.find_one({"_id": ObjectId(parent_id), "userType": 1, "parentid": ""}, {'_id': 1})
    if parent != None:
        child_users = list(user.find({"userType": {"$in": [2, 3, 4, 5]}}))
        if len(child_users) > 0:
            return_li = []
            for data in child_users:
                expo_data = exposure(data['_id'])
                return_li.append(expo_data)
        else:
            return_li = []
    else:
        return_li = []
    return JsonResponse(return_li, safe=False)


@csrf_exempt
def casinotransactions(req):
    body_data = json.loads(req.body.decode('utf-8'))
    # if body_data:
    casino = casino_db['transactions']

    casino_transaction = list(
        casino.find({"clientUsername": body_data['user_id'], "transactionCode": {"$ne": "bet_place"}}, {"_id": 0}))
    return_json = [{"amount": data['amount'], "balance": "debit" if data['transactionType'] == "DR" else "credit",
                    "game_code": data['gameCode'], "game_id": data['roundID'], "transaction_time": data['date_time'],
                    "transaction_type": data['transactionCode'], "user": ""} for data in casino_transaction]

    return HttpResponse(json.dumps(return_json, default=str), content_type='application/json')




class UserExpo(APIView):
    def post(self, request):
        try:
            userbet = db['userbets']
            user = db['users']
            admintrasaction = db['admintransactions']
            body_data = request.data
            if body_data != "":
                body_user_id = body_data['user_id']
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

                        user_id = str(user_data[0]['_id'])

                        agg_fancies = db['betrecords'].aggregate(
                            [{'$match': {'user_id': {'$eq': ObjectId(user_id)}, 'bet_on': {'$eq': 'fancy'},
                                        'status': {'$eq': 'pending'}}}, {
                                '$group': {'_id': '$headname', 'fancy': {
                                    '$push': {'no': '$no', 'stake': '$stake', 'no_amount': '$no_amount',
                                            'back_size': '$back_size',
                                            'lay_size': '$lay_size'}}}}])

                        fancy_expo = 0
                        for fancy in agg_fancies:
                            exposure = {}
                            for _ in range(1001):
                                exposure[_] = 0
                            for f in fancy['fancy']:
                                if f['no'] == 'no':
                                    for _ in range(int(f['no_amount'])):
                                        exposure[_] += abs(int(f['stake']))
                                    for _ in range(int(f['no_amount']), 1001):
                                        exposure[_] -= abs(int((int(f['stake']) * int(f['lay_size'])) / 100))
                                else:
                                    for _ in range(int(f['no_amount'])):
                                        exposure[_] -= abs(int(f['stake']))
                                    for _ in range(int(f['no_amount']), 1001):
                                        exposure[_] += abs(int((int(f['stake']) * int(f['back_size'])) / 100))

                            fancy_expo += abs(min(exposure.values()))
                        total_expo = abs(main_expo) + fancy_expo
                        available_balance = (user_data[0]['balance'] + pl + int(
                            user_data[0]['casino_profit_loss'])) - total_expo
                        futur_exp = futur_expo(user_data[0]['_id'])

                        # user_data[0].update({'data_new': total_expo, '_id': str(user_data[0]['_id'])})

                        #                    print({"stat": True, "user_name": user_data[0]['username'],
                        #                                             "user_available_balance": int(available_balance),
                        #                                             "user_balance": user_data[0]['balance'], "user_pl": pl,
                        #                                             "user_exposure": total_expo, "future_expo": futur_exp,
                        #                                             "casino_profit_loss": user_data[0]['casino_profit_loss']})

                        response = JsonResponse({"stat": True, "user_name": user_data[0]['username'],
                                                "user_available_balance": int(available_balance),
                                                "user_balance": user_data[0]['balance'], "user_pl": pl,
                                                "user_exposure": total_expo, "future_expo": futur_exp,
                                                "casino_profit_loss": user_data[0]['casino_profit_loss']}, safe=False)
                    else:
                        futur_exp = futur_expo(user_data[0]['_id'])

                        response = JsonResponse({"stat": True, "user_name": user_data[0]['username'],
                                                "user_available_balance": int(user_data[0]['balance']) + int(pl) + int(
                                                    user_data[0]['casino_profit_loss']),
                                                "user_balance": int(user_data[0]['balance']), "user_pl": pl,
                                                "user_exposure": 0, "future_expo": futur_exp,
                                                "casino_profit_loss": user_data[0]['casino_profit_loss']}, safe=False)
                else:
                    response = JsonResponse({"stat": False, "user_expo": 0}, safe=False)

            else:
                response = JsonResponse({"stat": False, "user_expo": 0}, safe=False)
        except Exception as e:
            response = JsonResponse({"stat": False, "user_expo": 0,"error":str(e)}, safe=False)

        return response   