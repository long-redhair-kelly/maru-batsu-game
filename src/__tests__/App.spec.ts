import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import App from '../App.vue'

describe('App.vue', () => {
  it('App スナップショット', () => {
    expect(wrapper).toMatchSnapshot()
  })
  it('コンポーネントを描画できる', () => {
    // Componentを描画できる
    const wrapper = shallowMount(App)
    const comp = wrapper.findComponent(App)
    expect(comp.exists()).toBe(true)
  })

  it('ゲームの状態を正しく初期化する', () => {
    const wrapper = shallowMount(App)
    expect(wrapper.vm.states).toEqual([
      [-1, -1, -1],
      [-1, -1, -1],
      [-1, -1, -1]
    ])
  })

  it('選択後、playerIdを更新する', () => {
    const wrapper = shallowMount(App)
    const selectCell = wrapper.vm.onSelect(0, 0)
    console.debug('selectCell: ', selectCell)
    expect(wrapper.vm.playerId).toEqual(2)
  })

  it('勝敗を判定する', () => {
    const wrapper = shallowMount(App)
    wrapper.vm.states = [
      [1, 1, 2],
      [-1, 2, 1],
      [2, -1, 2]
    ]
    const winnerId = wrapper.vm.getWinnerId()
    expect(winnerId).toEqual(2)
  })

  it('ドローを検出する', () => {
    const wrapper = shallowMount(App)
    wrapper.vm.states = [
      [1, 2, 1],
      [1, 2, 2],
      [2, 1, 2]
    ]
    const isDraw = wrapper.vm.isDraw()
    expect(isDraw).toEqual(true)
  })
})
