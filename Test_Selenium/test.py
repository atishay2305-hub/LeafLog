from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select
from selenium.webdriver.common.keys import Keys
import time

driver = webdriver.Chrome()
driver.get("http://localhost:3000/")
driver.maximize_window()

# REGISTER = driver.find_element(By.XPATH, '//*[@id="__next"]/section/div/div/a[2]')
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



# CLICK PROFILE PAGE from navbar

time.sleep(5)

driver.get("http://localhost:3000/profile")
driver.maximize_window()

time.sleep(2)

driver.get("http://localhost:3000/LandingPage")
driver.maximize_window()

time.sleep(5)

# Scroll to the bottom of the page
scroll_bottom_script = "arguments[0].scrollIntoView({behavior: 'smooth', block: 'end', inline: 'nearest'});"
driver.execute_script(scroll_bottom_script, driver.find_element(By.TAG_NAME, "footer"))

time.sleep(5)

# log a plant manually
driver.get("http://localhost:3000/plant-log")
driver.maximize_window()

time.sleep(6)

plant_species = driver.find_element(By.XPATH, '//*[@id="plantSpecies"]')
plant_species.click()
plant_species.send_keys("e")
time.sleep(7)
specie_name = driver.find_element(By.XPATH, "//div[@id='plantSpeciesContainer']//div[1]")
specie_name.click()

time.sleep(5)

# Find the dropdown element
dropdown_start = driver.find_element(By.XPATH, '//*[@id="cycle"]')

# Click the dropdown to open it
dropdown_start.click()

# Wait for the dropdown options to load (adjust the sleep time as needed)
time.sleep(6)

# Wrap the dropdown element in a Select object
select = Select(dropdown_start)

# Select the option by visible text
select.select_by_visible_text("Annual")

main_background = driver.find_element(By.XPATH, '//*[@id="__next"]/div/div')
main_background.click()

time.sleep(5)

dropdown_2 = driver.find_element(By.XPATH, '//*[@id="watering"]')
dropdown_2.click()

time.sleep(5)

select2 = Select(dropdown_2)

select2.select_by_visible_text("Daily")

main_background = driver.find_element(By.XPATH, '//*[@id="__next"]/div/div')
main_background.click()

dropdown_3 = driver.find_element(By.XPATH, '//*[@id="sunlight"]')
dropdown_3.click()

time.sleep(4)

select3 = Select(dropdown_3)

select3.select_by_visible_text('Full Sun')

main_background = driver.find_element(By.XPATH, '//*[@id="__next"]/div/div')
main_background.click()

time.sleep(5)

# # Press Enter key at a certain position using JavaScript
driver.execute_script("var event = new KeyboardEvent('keydown', { 'key': 'Enter' }); document.dispatchEvent(event);")

time.sleep(3)

alert = driver.switch_to.alert
alert.dismiss()

time.sleep(3)

driver.get("http://localhost:3000/my-plants")
driver.maximize_window()

time.sleep(3)

# send notification

driver.get("http://localhost:3000/notifications")
time.sleep(3)

field_element = driver.find_element(By.XPATH, '//*[@id="email"]')
field_element.click()
field_element.send_keys("atishay23@gmail.com")



# checkbox = driver.find_element(By.TAG_NAME, 'checkbox')
# checkbox.click()


submit_button = driver.find_element(By.XPATH, '//*[@id="__next"]/div[1]/div/form/button')
submit_button.click()

time.sleep(5)

# logout
logout_button = driver.find_element(By.XPATH, '//*[@id="__next"]/header/div/nav/ul/li[7]/a')
logout_button.click()

driver.close()
