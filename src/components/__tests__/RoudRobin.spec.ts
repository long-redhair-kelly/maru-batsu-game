import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import RoundRobin from '../RoundRobin.vue'

describe('RoundRobin', () => {
  const states = [
    [1, 0, 2],
    [2, 1, 1],
    [0, 2, 0]
  ]

  it('各マスが期待どおりの状態で描画されていること', () => {
    const wrapper = mount(RoundRobin, {
      props: {
        states
      }
    })

    const tableRows = wrapper.findAll('tr')
    expect(tableRows).toHaveLength(states.length)

    for (let i = 0; i < states.length; i++) {
      const tableCells = tableRows[i].findAll('td')

      expect(tableCells).toHaveLength(states[i].length)

      for (let j = 0; j < states[i].length; j++) {
        const cellContent = tableCells[j].text()

        if (states[i][j] === 1) {
          expect(cellContent).toEqual('○')
        } else if (states[i][j] === 2) {
          expect(cellContent).toEqual('×')
        }
      }
    }
  })

  it('セルをクリックすると、onSelectイベントが発生すること', async () => {
    const rowIndex = 1
    const colIndex = 2
    const wrapper = mount(RoundRobin, {
      props: {
        states
      }
    })

    await wrapper
      .find(`#table tr:nth-child(${rowIndex + 1}) td:nth-child(${colIndex + 1})`)
      .trigger('click')

    expect(wrapper.emitted('onSelect')).toBeTruthy()
    expect(wrapper.emitted('onSelect')?.[0]).toEqual([rowIndex, colIndex])
  })
})
