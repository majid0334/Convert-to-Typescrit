<!-- TaskList.vue -->
<template>
  <div>
    <h2>Task List</h2>
    <ul>
      <h1>create task</h1>
      <div>
        <input v-model="newTaskTitle" placeholder="New Task Title" />
        <button @click="addTask">Add Task</button>
      </div>
      <li v-for="task in tasks" :key="task.id">
        <div>
          {{ task.title }} - {{ task.completed ? "Completed" : "Not done" }}
          <button @click="toggleTask(task.id)">Toggle</button>
          <button @click="deleteTask(task.id)">Delete</button>
          <button @click="startEditing(task.id)">Edit</button>
        </div>
        <div v-if="task.id === editingTaskId">
          <input v-model="editedTaskTitle" />
          <button @click="saveEditedTask">Save</button>
          <button @click="cancelEditing">Cancel</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref } from "vue";
import { useQuery, useMutation } from "@vue/apollo-composable";
import gql from "graphql-tag";

const CREATE_TASK_MUTATION = gql`
  mutation CreateTask($title: String!) {
    createTask(title: $title) {
      id
      title
      completed
    }
  }
`;

const TASKS_QUERY = gql`
  query {
    tasks {
      id
      title
      completed
    }
  }
`;

const TOGGLE_TASK_MUTATION = gql`
  mutation ToggleTask($id: Int!) {
    toggleTask(id: $id) {
      id
      title
      completed
    }
  }
`;

const DELETE_TASK_MUTATION = gql`
  mutation DeleteTask($id: Int!) {
    deleteTask(id: $id) {
      id
    }
  }
`;

const UPDATE_TASK_MUTATION = gql`
  mutation UpdateTask($id: Int!, $title: String!) {
    updateTask(id: $id, title: $title) {
      id
      title
      completed
    }
  }
`;

export default {
  setup() {
    const { result, loading, error, onResult } = useQuery(TASKS_QUERY);
    const { mutate: toggleTaskMutation } = useMutation(TOGGLE_TASK_MUTATION);
    const { mutate: deleteTaskMutation } = useMutation(DELETE_TASK_MUTATION);
    const { mutate: updateTaskMutation } = useMutation(UPDATE_TASK_MUTATION);
    const { mutate: createTaskMutation } = useMutation(CREATE_TASK_MUTATION);
    const newTaskTitle = ref("");

    const tasks = ref([]);
    const editingTaskId = ref(null);
    const editedTaskTitle = ref("");

    const addTask = async () => {
      try {
        const result = await createTaskMutation({ title: newTaskTitle.value });
        // Handle the result if needed
        console.log(result.data.createTask);
        // Clear the input field after adding the task
        newTaskTitle.value = "";
      } catch (error) {
        // Handle errors
        console.error("Error creating task:", error);
      }
    };

    onResult((result) => {
      if (result && result.data) {
        tasks.value = result.data.tasks;
        console.log(tasks.value);
      }
    });

    const toggleTask = async (id) => {
      await toggleTaskMutation({ id });
    };

    const deleteTask = async (id) => {
      await deleteTaskMutation({ id });
    };

    const startEditing = (id) => {
      editingTaskId.value = id;
      // Set the initial edited task title
      const task = tasks.value.find((t) => t.id === id);
      editedTaskTitle.value = task ? task.title : "";
    };

    const saveEditedTask = async () => {
      if (editingTaskId.value !== null) {
        await updateTaskMutation({
          id: editingTaskId.value,
          title: editedTaskTitle.value,
        });
        cancelEditing();
      }
    };

    const cancelEditing = () => {
      editingTaskId.value = null;
      editedTaskTitle.value = "";
    };

    return {
      newTaskTitle,
      addTask,
      tasks,
      loading,
      error,
      toggleTask,
      deleteTask,
      startEditing,
      editedTaskTitle,
      saveEditedTask,
      cancelEditing,
      editingTaskId,
    };
  },
};
</script>
