import configparser, os
import time
import pandas as pd
import threading
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait 
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from django.conf import settings


def read_config():
    config = configparser.RawConfigParser()
    # config.read(os.path.join(settings.BASE_DIR,'pages'))
    config.read(os.path.join(settings.BASE_DIR,'pages','scrapper', 'config.ini'))
    return config

conf = read_config()

print(conf['login']['username'])

def driver_obj():

    service=Service(os.path.join(settings.BASE_DIR,'pages','scrapper', 'chromedriver.exe'))
    #print(os.path.join(os.getcwd(), 'chromedriver.exe'))
    option = webdriver.ChromeOptions()
    # I use the following options as my machine is a window subsystem linux. 
    # I recommend to use the headless option at least, out of the 3
    #option.add_argument('--headless')
    #option.add_argument('--headless') 
    # option.add_argument('--no-sandbox') 
    # option.add_argument('--disable-gpu')  # applicable to windows os only
    # option.add_argument('--no-sandbox')
    # option.add_argument('--disable-dev-sh-usage')
    option.add_argument("--start-maximized")
    option.add_argument("--incognito")
    option.add_argument("user-data-dir="+ os.path.join(os.getcwd(), 'profile'))
    #option.add_experimental_option("excludeSwitches", ["enable-automation"])
    #option.add_experimental_option('useAutomationExtension', False)
    option.add_argument('--disable-blink-features=AutomationControlled')
    # Replace YOUR-PATH-TO-CHROMEDRIVER with your chromedriver location
    driver = webdriver.Chrome(service=service, options=option)

    # driver.get(url="https://www.healthifyme.com/in/")
    driver.get("https://world777.com/admin")
    # time.sleep(2)
    return driver



def create_account(driver=None):
    
    # username, fullname,password,confirm pass,city,mobile,credit ammount,usertype,remark,transction code,-- Submit
    payload = {
        "username":"rakshittt234",
        "fullname":"mohit tiwari",
        "password":"Mohit@123",
        "confirm_password":"Mohit@123",
        "city":"jaipur",
        "mobile":"1234567890",
        "credit":100,
        "usertype":"user",
        "remark":"this is for test purpose",
        "transction_code":conf["login"]["transaction_id"]
    }
    driver.find_element(By.XPATH, "/html/body/div[2]/div/div[2]/div/div/div/form/div/div[1]/div/div/div[1]/input").send_keys(payload['username'])
    driver.find_element(By.XPATH, "/html/body/div[2]/div/div[2]/div/div/div/form/div/div[1]/div/div/div[2]/input").send_keys(payload['fullname'])
    driver.find_element(By.XPATH, "/html/body/div[2]/div/div[2]/div/div/div/form/div/div[1]/div/div/div[3]/input").send_keys(payload['password'])
    driver.find_element(By.XPATH, "/html/body/div[2]/div/div[2]/div/div/div/form/div/div[1]/div/div/div[4]/input").send_keys(payload['confirm_password'])
    driver.find_element(By.XPATH, "/html/body/div[2]/div/div[2]/div/div/div/form/div/div[1]/div/div/div[5]/input").send_keys(payload['city'])
    driver.find_element(By.XPATH, "/html/body/div[2]/div/div[2]/div/div/div/form/div/div[1]/div/div/div[6]/input").send_keys(payload['mobile'])
    driver.find_element(By.XPATH, "/html/body/div[2]/div/div[2]/div/div/div/form/div/div[2]/div/div/div[1]/input").send_keys(payload['credit'])
    driver.find_element(By.XPATH, "/html/body/div[2]/div/div[2]/div/div/div/form/div/div[2]/div/div/div[2]/select").find_element(By.XPATH, "/html/body/div[2]/div/div[2]/div/div/div/form/div/div[2]/div/div/div[2]/select/option[3]").click()
    time.sleep(2)
    driver.find_element(By.XPATH, "/html/body/div[2]/div/div[2]/div/div/div/form/div/div[2]/div/div/div[3]/textarea").send_keys(payload['remark'])
    driver.find_element(By.XPATH, "/html/body/div[2]/div/div[2]/div/div/div/form/div/div[2]/div/div/div[5]/input").send_keys(payload['transction_code'])
    driver.find_element(By.XPATH, "/html/body/div[2]/div/div[2]/div/div/div/form/div/div[2]/div/div/div[5]/button").click()


def deposite(driver):
    payload = {
        "ammount":100,
        "remark":"xyzzz",
        "transition_id":conf["login"]["transaction_id"]
    }
    time.sleep(3)
    driver.find_element(By.XPATH, "/html/body/div[4]/div[1]/div/div/div/div/div[2]/div/form/div[4]/div/input").send_keys(payload['ammount'])
    driver.find_element(By.XPATH, "/html/body/div[4]/div[1]/div/div/div/div/div[2]/div/form/div[5]/div/textarea").send_keys(payload['remark'])
    driver.find_element(By.XPATH, "/html/body/div[4]/div[1]/div/div/div/div/div[2]/div/form/div[6]/div/input").send_keys(payload['transition_id'])
    driver.find_element(By.XPATH, "/html/body/div[4]/div[1]/div/div/div/div/div[2]/div/form/div[7]/div/button").click()
    time.sleep(5)
    driver.find_element(By.XPATH, "/html/body/div[4]/div[1]/div/div/header/button").click()


# driver_obj()
def main(data="null"):
    # 
    driver = driver_obj()
    # time.sleep(10)
    username = None
    while not username:
        try:
            print("called")
            time.sleep(20)
            driver.find_element(By.XPATH, "/html/body/div[2]/div/div/div/div[1]/div[3]/button").click()
            username = driver.find_element(By.XPATH, "/html/body/div[2]/div/div/div/div[6]/div[1]/div/div[2]/div/div[1]/form/div[1]/div/input")
            username.send_keys(conf['login']['username'])
            password = driver.find_element(By.XPATH, "/html/body/div[2]/div/div/div/div[6]/div[1]/div/div[2]/div/div[1]/form/div[2]/div/input")
            password.send_keys(conf['login']['password'])
            driver.find_element(By.XPATH, "/html/body/div[2]/div/div/div/div[6]/div[1]/div/div[2]/div/div[1]/form/div[3]/button").click()
            time.sleep(5)
            print("Here")
            # elem = driver.find_element(By.XPATH, "/html/body/div[4]/div[1]/div/div/header/div")
            # if elem.is_displayed():
            #     elem.click()
            #     driver.find_element(By.XPATH, "/html/body/div[5]/div[1]/div/div/header/button").click()
            # else:
            #     driver.find_element(By.XPATH, "/html/body/div[5]/div[1]/div/div/header/button").click()
            #     elem.click()
            # data = False
            # while data == False:
            try:
                time.sleep(5)
                # elem1 = WebDriverWait(driver, 2).until(EC.visibility_of_element_located((By.XPATH, "/html/body/div[4]/div[1]/div/div/header/div")))
                driver.find_element(By.XPATH, "/html/body/div[4]/div[1]/div/div/header/div").click()
                print("Here-1")
                driver.find_element(By.XPATH, "/html/body/div[5]/div[1]/div/div/header/button").click()
                print("Here-2")
                # data = True
            except Exception as e:
                # print("except-- > ",e)
                print("Here-3")
                driver.find_element(By.XPATH, "/html/body/div[5]/div[1]/div/div/header/button").click()
                print("Here-4")
                driver.find_element(By.XPATH, "/html/body/div[4]/div[1]/div/div/header/div").click()
                    # data = True
            driver.find_element(By.XPATH, "/html/body/div[2]/div/div[1]/div/div[1]/div[2]/div/div/div/div/ul/li[4]").click()
            time.sleep(2)
            print("Here-5", data)
            if data == "create":
                driver.find_element(By.XPATH, "/html/body/div[2]/div/div[1]/div/div[1]/div[2]/div/div/div/div/ul/li[4]/ul/li[2]").click()
                time.sleep(5)
                driver.find_element(By.XPATH, "/html/body/div[2]/div/div[2]/div/div/div/div[2]/div/div/div/div[1]/div[2]/div[2]/a").click()
                create_account(driver)
                time.sleep(2)
                driver.find_element(By.XPATH, "/html/body/div[2]/div/div[1]/div/div[1]/div[2]/div/div/div/div/ul/li[4]/ul/li[2]").click()
            else:
                driver.find_element(By.XPATH, "/html/body/div[2]/div/div[1]/div/div[1]/div[2]/div/div/div/div/ul/li[4]/ul/li[2]").click()
                arr = ['aksh123412','mohhhhit123','mohhhiiiitt123','testuser1234']
                try:
                    # for i in arr:
                        # user_action("deposite",driver,i)
                        time.sleep(2)
                        driver.find_element(By.XPATH,f"//span[text() ='{arr[0]}']//parent::*//following-sibling::td[6]/div/button[1]").click()
                        deposite(driver)
                except Exception as e:
                    print(e,"--->")
            time.sleep(500)
        except Exception as err:
            print("error", err)
            time.sleep(5)


    
    # WebElement element = driver.findElement(By.name ("element"));

# /html/body/div[2]/div/div[2]/div/div/div/div[2]/div/div/div/div[3]/div/table/tbody/tr[2]/td[1]                   name
# /html/body/div[2]/div/div[2]/div/div/div/div[2]/div/div/div/div[3]/div/table/tbody/tr[2]/td[7]/div/button[1]
# /html/body/div[2]/div/div[2]/div/div/div/div[2]/div/div/div/div[3]/div/table/tbody/tr[2]/td[7]/div/button[2]





def user_action(action,driver,data):
    print("111",data)
    if action == "deposite":
        driver.find_element(By.XPATH,f"//span[text() ='{data}']//parent::*//following-sibling::td[6]/div/button[1]")
        deposite(driver)
    else:
        driver.find_element(By.XPATH,f"//span[text() = '{data}']//parent::*//following-sibling::td[6]/div/button[2]")
        deposite(driver)
    time.sleep(2)


# main("create")