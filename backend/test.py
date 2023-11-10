import random
import string

def generate_password(strength):
    if strength == 0:  # Weak passwords
        length = random.randint(5, 8)
        return ''.join(random.choices(string.ascii_lowercase + string.digits, k=length))
    elif strength == 2:  # Strong passwords
        length = random.randint(12, 16)
        characters = string.ascii_letters + string.digits + string.punctuation
        return ''.join(random.choices(characters, k=length))
    else:
        return None

passwords = []
for _ in range(50):  # Generate 50 weak passwords
    passwords.append([generate_password(0), 0])
for _ in range(50):  # Generate 50 strong passwords
    passwords.append([generate_password(2), 2])

# Display first 5 for reference
random.shuffle(passwords)
for x,y in passwords:
    print(x,',',y)
