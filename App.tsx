import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, StatusBar, Alert, Modal, Pressable, TouchableOpacity, ScrollView } from "react-native";
import { style } from "./styles/style";
interface IToDo {
  text: string;
  completed: boolean;
}

export default function App() {
  const [value, setValue] = useState<string>("");
  const [toDoList, setToDos] = useState<IToDo[]>([]);
  const [error, showError] = useState<Boolean>(false);
  const [modalVisible, setModalVisible] = useState(false);

  const handleSubmit = (): void => {
    if (value.trim()) setToDos([...toDoList, { text: value, completed: false }]);
    else showError(true);
    setModalVisible(!modalVisible);
    setValue("");
  };

  const removeItem = (index: number): void => {
    const newToDoList = [...toDoList];
    newToDoList.splice(index, 1);
    setToDos(newToDoList);
  };

  const toggleComplete = (index: number): void => {
    const newToDoList = [...toDoList];
    newToDoList[index].completed = !newToDoList[index].completed;
    setToDos(newToDoList);
  };

  const getCurrentDate = () => {
    var d = new Date();
    var date = d.getDate();
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var monthName = months[d.getMonth()];
    var year = d.getFullYear();
    return date + " " + monthName + " " + year;
  };

  return (
    <View style={style.parent}>
      <StatusBar barStyle="light-content" backgroundColor="#303f9f" />

      {/* HEADER */}
      <View style={style.containerHeader}>
        <Text style={style.labelCurrentDay}>{getCurrentDate()}</Text>
        <View style={style.containerSubHeader}>
          <View style={style.statusDay}>
            <Text style={style.labelToday}>Today</Text>
            <Text style={style.labelAmountTask}>{toDoList.length} task</Text>
          </View>
          <TouchableOpacity onPress={() => setModalVisible(true)} style={style.touchableAddNewButton}>
            <Text style={style.labelButtonAddNew}>Add New</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* lIST TASK */}
      <View style={style.listTask}>
        <ScrollView style={{ marginBottom: 20 }}>
          {toDoList.length === 0 && <Text style={{ alignSelf: "center", marginTop: 20 }}>No to do task available</Text>}
          {toDoList.map((toDo: IToDo, index: number) => (
            //* LIST ITEM */
            <View style={style.listItem} key={`${index}_${toDo.text}`}>
              <Text style={[style.task, { textDecorationLine: toDo.completed ? "line-through" : "none" }]}>{toDo.text}</Text>
              <Text style={style.labelButtonComplete} onPress={() => toggleComplete(index)}>
                {toDo.completed ? "Completed" : "Complete"}{" "}
              </Text>
              <TouchableOpacity
                style={style.touchableButtonDelete}
                onPress={() => {
                  removeItem(index);
                }}
              >
                <Text style={{ color: "#d50000" }}>X</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* MODAL */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={style.centeredView}>
          <View style={style.modalView}>
            <TextInput
              placeholder="Enter your todo task..."
              value={value}
              onChangeText={(e) => {
                setValue(e);
                showError(false);
              }}
              style={style.inputBox}
            />
            {error && <Text style={style.error}>Error: Input field is empty...</Text>}
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity style={[style.button, style.buttonClose]} onPress={() => setModalVisible(!modalVisible)}>
                <Text style={style.labelGoBack}>Go Back</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[style.button, style.buttonAddTask]} onPress={handleSubmit}>
                <Text style={style.textStyle}>Add Task</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
