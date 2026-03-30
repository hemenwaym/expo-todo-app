import React, { useState } from 'react';
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  StatusBar,
} from 'react-native';

export default function App() {
  // ok so this is just my list of tasks, stored as state so the screen updates when i change stuff
  const [tasks, setTasks] = useState([
    { key: '1', description: 'Do homework', completed: false },
    { key: '2', description: 'Buy groceries', completed: false },
    { key: '3', description: 'Read a book', completed: false },
  ]);

  // this holds whatever the user is typing in the input box
  const [newTask, setNewTask] = useState('');

  // when you tap a task it flips completed to true or false
  // map just goes through every task and only changes the one that matches the key
  const toggleTask = (key) => {
    setTasks(tasks.map(task =>
      task.key === key ? { ...task, completed: !task.completed } : task
    ));
  };

  // adds a new task to the list
  // if the input is empty just do nothing lol
  const addTask = () => {
    if (newTask.trim() === '') return;
    const key = Date.now().toString(); // unique key using timestamp so no duplicates
    setTasks([...tasks, { key, description: newTask, completed: false }]);
    setNewTask(''); // clear the input after adding
  };

  // this is what each task looks like in the list
  // if its done, strike it through so you feel accomplished
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.taskRow} onPress={() => toggleTask(item.key)}>
      <Text style={styles.checkbox}>{item.completed ? '☑' : '☐'}</Text>
      <Text style={[styles.taskText, item.completed && styles.completed]}>
        {item.description}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>

      {/* header shows the title and how many tasks are left */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Tasks</Text>
        <Text style={styles.headerSubtitle}>
          {tasks.filter(t => !t.completed).length} remaining
        </Text>
      </View>

      {/* flatlist is basically map but for react native, more efficient for long lists */}
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        ListEmptyComponent={
          <Text style={styles.emptyText}>no tasks yet, add one ig</Text>
        }
      />

      {/* input box + add button at the bottom */}
      {/* onSubmitEditing lets you just press enter instead of clicking add */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="New Task"
          value={newTask}
          onChangeText={setNewTask}
          onSubmitEditing={addTask}
        />
        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    // android has a status bar that covers stuff so gotta add padding for it
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    backgroundColor: '#2089dc',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#cce4ff',
    marginTop: 2,
  },
  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 14,
    marginHorizontal: 12,
    marginTop: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  checkbox: {
    fontSize: 22,
    marginRight: 12,
    color: '#2089dc',
  },
  taskText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  // strikethrough style when task is done
  completed: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    color: '#aaa',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    color: '#aaa',
    fontSize: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginRight: 8,
    backgroundColor: '#fafafa',
  },
  addButton: {
    backgroundColor: '#2089dc',
    borderRadius: 8,
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});