<script setup lang="ts">
import '@/css/RoundRobin.css'
defineProps({
  states: Array<Array<number>>
})

const emit = defineEmits(['onSelect', 'playerId'])
const clickSelect = (rowIndex: number, colIndex: number) => emit('onSelect', rowIndex, colIndex)
</script>

<template>
  <table id="table">
    <tr v-for="(row, rowIndex) in states" :key="'row-' + rowIndex">
      <td
        v-for="(state, colIndex) in row"
        :key="'col-' + colIndex"
        @click="clickSelect(rowIndex, colIndex)"
      >
        <div v-if="state === 1" class="player1">○</div>
        <div v-if="state === 2" class="player2">×</div>
      </td>
    </tr>
  </table>
</template>
