<script setup lang="ts">
import '@/css/GameMessage.css'

defineProps({
  playerId: Number
})
</script>

<template>
  <div class="messageArea" style="text-align: center">
    <div v-if="playerId === 1" class="player1">「○ プレイヤーさん、マスを選んでください」</div>
    <div v-if="playerId === 2" class="player2">「× プレイヤーさん、マスを選んでください」</div>
  </div>
</template>
