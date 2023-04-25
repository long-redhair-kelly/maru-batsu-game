import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import GameMessage from '../GameMessage.vue'

describe('GameMessage.vue', () => {
  const wrapper = mount(GameMessage)
  it('GameMessage スナップショット', () => {
    expect(wrapper).toMatchSnapshot()
  })
  it('playerIdが1の場合、「○ プレイヤーさん、マスを選んでください」メッセージが表示されること', () => {
    const wrapper = mount(GameMessage, {
      props: {
        playerId: 1
      }
    })

    expect(wrapper.text()).toContain('「○ プレイヤーさん、マスを選んでください」')
  })

  it('playerIdが2の場合、「× プレイヤーさん、マスを選んでください」メッセージが表示されること', () => {
    const wrapper = mount(GameMessage, {
      props: {
        playerId: 2
      }
    })

    expect(wrapper.text()).toContain('「× プレイヤーさん、マスを選んでください」')
  })
})
