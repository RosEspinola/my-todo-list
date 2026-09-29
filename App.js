import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";

export default function App() {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (input.trim() === "") {
      return;
    }

    const newTask = {
      id: Date.now().toString(),
      name: input,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setInput("");
  };

  const completeTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const renderTask = ({ item }) => {
    return (
      <View style={styles.taskItem}>
        <TouchableOpacity
          style={styles.taskName}
          onPress={() => completeTask(item.id)}
        >
          <Text
            style={[
              styles.taskText,
              item.completed && styles.completedText,
            ]}
          >
            {item.completed ? "✓ " : "○ "}
            {item.name}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => deleteTask(item.id)}
        >
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My To-Do List</Text>

      <Text style={styles.subtitle}>
        Add your daily tasks below
      </Text>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Enter a task"
          value={input}
          onChangeText={setInput}
        />

        <TouchableOpacity
          style={styles.addButton}
          onPress={addTask}
        >
          <Text style={styles.addText}>Add</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.listTitle}>
        Tasks: {tasks.length}
      </Text>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={renderTask}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No tasks yet.
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 20,
    paddingTop: 60,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
  },

  subtitle: {
    textAlign: "center",
    color: "#777",
    marginBottom: 25,
  },

  inputRow: {
    flexDirection: "row",
    marginBottom: 20,
  },

  input: {
    flex: 1,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },

  addButton: {
    backgroundColor: "#4F46E5",
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginLeft: 10,
  },

  addText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },

  listTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },

  taskItem: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },

  taskName: {
    flex: 1,
  },

  taskText: {
    fontSize: 17,
  },

  completedText: {
    textDecorationLine: "line-through",
    color: "#999",
  },

  deleteButton: {
    backgroundColor: "#E53935",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },

  deleteText: {
    color: "white",
    fontWeight: "bold",
  },

  emptyText: {
    textAlign: "center",
    color: "#888",
    marginTop: 30,
    fontSize: 16,
  },
});