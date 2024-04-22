from selenium import webdriver
from selenium.webdriver.common.by import By
import time

driver = webdriver.Chrome()
driver.get("http://localhost:3000/")
driver.maximize_window()

REGISTER = driver.find_element(By.XPATH, '//*[@id="__next"]/section/div/div/a[2]')
REGISTER.click()

time.sleep(2)  # Added a small delay to ensure the page loads completely

# name
NAME = driver.find_element(By.XPATH, '//*[@id="name"]')
NAME.click()
NAME.send_keys("test id")

EMAIL = driver.find_element(By.XPATH, '//*[@id="email"]')
EMAIL.click()
EMAIL.send_keys("test1@user.com")

PASSWORD = driver.find_element(By.XPATH, '//*[@id="password"]')
PASSWORD.click()
PASSWORD.send_keys("password123")

# SUBMIT
SUBMIT = driver.find_element(By.XPATH, '//*[@id="__next"]/section/div/form/button')
SUBMIT.click()

time.sleep(2)  # Added a delay to ensure registration completes before moving to the next step

# Now, let's proceed to login
driver.get("http://localhost:3000/login")
driver.maximize_window()

LOGIN_EMAIL = driver.find_element(By.XPATH, '//*[@id="email"]')
LOGIN_EMAIL.click()
LOGIN_EMAIL.send_keys("test1@user.com")

LOGIN_PASSWORD = driver.find_element(By.XPATH, '//*[@id="password"]')
LOGIN_PASSWORD.click()
LOGIN_PASSWORD.send_keys("password123")

# SIGN IN BUTTON
SIGN_IN = driver.find_element(By.XPATH, '//*[@id="__next"]/section/div/form/button')
SIGN_IN.click()

time.sleep(4)

driver.get("http://localhost:3000/LandingPage")
driver.maximize_window()

# CLICK PROFILE PAGE from navbar
PROFILE_NAVBAR = driver.find_element(By.XPATH, '//*[@id="__next"]/header/div/nav/ul/li[4]/a')
PROFILE_NAVBAR.click()

time.sleep(2)

# Navigate back
driver.back()

time.sleep(3)

# Scroll to the bottom of the page
scroll_bottom_script = "arguments[0].scrollIntoView({behavior: 'smooth', block: 'end', inline: 'nearest'});"
driver.execute_script(scroll_bottom_script, driver.find_element(By.TAG_NAME, "footer"))
time.sleep(2)  # Wait for a few seconds

# Scroll back to the top of the page
scroll_top_script = "arguments[0].scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});"
driver.execute_script(scroll_top_script, driver.find_element(By.XPATH, '//*[@id="__next"]'))
time.sleep(2)  # Wait for a few seconds

# search a plant
time.sleep(2)
driver.get("http://localhost:3000/search")
driver.maximize_window()

SEARCH = driver.find_element(By.XPATH, '//*[@id="__next"]/div/section/div[1]/form/input')
SEARCH.click()
SEARCH.send_keys("e")

search_button = driver.find_element(By.XPATH, '//*[@id="__next"]/div/section/div[1]/form/button')
search_button.click()

# Click the first "Add to My Plants" button
first_add_to_my_plants_button = driver.find_element(By.XPATH, '//*[@id="__next"]/div/section/div[2]/div/div[1]/button')
first_add_to_my_plants_button.click()



# log a plant manually

# see my-plants page

# logout 

# TODO: LOGOUT SESSION

driver.close()
