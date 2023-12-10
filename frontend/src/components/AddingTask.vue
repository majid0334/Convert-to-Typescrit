<!-- AddTask.vue -->
<template>
  <h1>create task</h1>
  <div>
    <input v-model="newTaskTitle" placeholder="New Task Title" />
    <button @click="addTask">Add Task</button>
  </div>
</template>

<script>
import { ref } from "vue";
import { useMutation } from "@vue/apollo-composable";
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

export default {
  setup() {
    const { mutate: createTaskMutation } = useMutation(CREATE_TASK_MUTATION);
    const newTaskTitle = ref("");

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

    return {
      newTaskTitle,
      addTask,
    };
  },
};
</script>
