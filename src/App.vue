<script setup lang="ts">
import { ref, onMounted } from 'vue'
import RoundRobin from '../src/components/RoundRobin.vue'
import GameMessage from './components/GameMessage.vue'

interface Player {
  mark: string
}

// アクティブプレイヤー
const playerId = ref(1)

// 勝者ID
const winnerId = ref(-1)

// ボードの状態
let states = ref()

/**
 * ボードの初期化
 */
const init = () => {
  states.value = [
    [-1, -1, -1],
    [-1, -1, -1],
    [-1, -1, -1]
  ]
}

onMounted(() => {
  init()
})

/**
 * ボード選択
 *
 * @param rowsIndex 行番号
 * @param colsIndex 列番号
 */
const onSelect = (rowsIndex: number, colsIndex: number) => {
  // let board = states.value
  if (states.value[rowsIndex][colsIndex] == -1) {
    // 選択したマス目を埋める
    states.value[rowsIndex][colsIndex] = Number(playerId.value)

    // プレイヤーチェンジ
    playerId.value = Number(playerId.value) === 1 ? 2 : 1

    // ジャッジ
    winnerId.value = getWinnerId()
    if (winnerId.value != -1) {
      const playerIds: { [key: number]: Player } = {
        1: { mark: '○' },
        2: { mark: '×' }
      }

      init()
      alert(playerIds[winnerId.value].mark + ' さんの勝ちです。おめでとうございます！')
    } else if (isDraw()) {
      init()
      alert('引き分けです')
    }
  } else {
    alert('そのマスは、すでに選択されています！')
  }
}

/**
 * 勝者のIDを取得
 */
const getWinnerId = () => {
  let arrayIndex: number = 0
  // 縦3、横3のいずれかが同じIDになっているか
  const result = states.value.find((row: Array<number>, index: number) => {
    // 横判定
    if (isStatesFilled(row)) {
      arrayIndex = index
      return row[0]
    }

    // 縦判定
    const col = [states.value[0][index], states.value[1][index], states.value[2][index]]
    if (isStatesFilled(col)) {
      arrayIndex = index
      return states.value[0][index]
    }
  })

  // 縦 or 横判定結果
  if (result) {
    return result[arrayIndex]
  }

  // 斜め2（対角線）のいずれかが同じIDになっているか
  const skew1 = [states.value[0][0], states.value[1][1], states.value[2][2]]
  if (isStatesFilled(skew1)) {
    return states.value[0][0]
  }

  const skew2 = [states.value[0][2], states.value[1][1], states.value[2][0]]
  if (isStatesFilled(skew2)) {
    return states.value[0][2]
  }

  return -1
}

/**
 * 一列に揃っているか判定
 *
 * @param states
 *
 */
const isStatesFilled = (states: Array<number>) => {
  return states[0] != -1 && states[0] == states[1] && states[1] == states[2]
}

/**
 * 引き分け判定
 */
const isDraw = () => {
  for (const row of states.value) {
    if (row.includes(-1)) {
      return false
    }
  }
  return true
}
</script>

<template>
  <RoundRobin :states="states" @onSelect="onSelect" />
  <GameMessage :playerId="playerId" />
</template>
