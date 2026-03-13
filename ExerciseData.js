// Exercise data with example code for each topic
export const exercises = [
  {
    id: 1,
    name: 'Lists',
    description: 'Learn how to create and manipulate lists',
    example: `# Creating a list
fruits = ["apple", "banana", "cherry"]

# Accessing elements
print(fruits[0])  # Output: apple

# Adding items
fruits.append("orange")

# Removing items
fruits.remove("banana")

# List length
print(len(fruits))  # Output: 3

# Looping through list
for fruit in fruits:
    print(fruit)`,
    challenge: 'Create a list of 5 numbers and print their sum'
  },
  {
    id: 2,
    name: 'Tuples',
    description: 'Understand immutable sequences',
    example: `# Creating a tuple
colors = ("red", "green", "blue")

# Accessing elements
print(colors[0])  # Output: red

# Tuple length
print(len(colors))  # Output: 3

# Looping through tuple
for color in colors:
    print(color)

# Tuples are immutable
# colors[0] = "yellow"  # This will error!

# Unpacking tuples
red, green, blue = colors
print(red)  # Output: red`,
    challenge: 'Create a tuple and try to modify it (see the error!)'
  },
  {
    id: 3,
    name: 'Functions',
    description: 'Create reusable blocks of code',
    example: `# Defining a function
def greet(name):
    return f"Hello, {name}!"

# Calling a function
result = greet("Alice")
print(result)  # Output: Hello, Alice!

# Function with multiple parameters
def add(a, b):
    return a + b

print(add(5, 3))  # Output: 8

# Function with default parameter
def introduce(name, age=18):
    return f"{name} is {age} years old"

print(introduce("Bob"))  # Uses default age`,
    challenge: 'Create a function that calculates the area of a rectangle'
  },
  {
    id: 4,
    name: 'Loops',
    description: 'Repeat code multiple times',
    example: `# For loop
for i in range(5):
    print(i)  # Output: 0 1 2 3 4

# For loop with list
numbers = [10, 20, 30, 40]
for num in numbers:
    print(num)

# While loop
count = 0
while count < 3:
    print(count)
    count += 1

# Loop with break
for i in range(10):
    if i == 5:
        break
    print(i)  # Output: 0 1 2 3 4

# Loop with continue
for i in range(5):
    if i == 2:
        continue
    print(i)  # Output: 0 1 3 4`,
    challenge: 'Create a loop that prints only even numbers from 1-20'
  },
  {
    id: 5,
    name: 'Dictionaries',
    description: 'Store data with key-value pairs',
    example: `# Creating a dictionary
person = {
    "name": "Alice",
    "age": 25,
    "city": "New York"
}

# Accessing values
print(person["name"])  # Output: Alice

# Adding new key-value pair
person["email"] = "alice@example.com"

# Removing key-value pair
del person["city"]

# Looping through dictionary
for key, value in person.items():
    print(f"{key}: {value}")

# Getting all keys
print(person.keys())

# Getting all values
print(person.values())`,
    challenge: 'Create a dictionary for a book with title, author, and year'
  },
  {
    id: 6,
    name: 'String Methods',
    description: 'Manipulate text and strings',
    example: `# Creating strings
text = "Hello World"

# String methods
print(text.lower())  # Output: hello world
print(text.upper())  # Output: HELLO WORLD

# Replacing text
print(text.replace("World", "Python"))  # Output: Hello Python

# Splitting strings
words = text.split()
print(words)  # Output: ['Hello', 'World']

# Joining strings
new_text = "-".join(words)
print(new_text)  # Output: Hello-World

# Checking if substring exists
print("Hello" in text)  # Output: True

# String formatting
name = "Bob"
age = 30
message = f"{name} is {age} years old"
print(message)  # Output: Bob is 30 years old`,
    challenge: 'Create a string and print it in reverse'
  }
];
