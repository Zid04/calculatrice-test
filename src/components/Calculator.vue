<template>
  <div class="calculator-wrapper">
    <div class="calculator">
      <div class="display">
        <div class="display-expression">{{ expression }}</div>
        <div class="display-value">{{ state.display }}</div>
        <div v-if="state.memory !== 0" class="memory-indicator">M: {{ state.memory }}</div>
      </div>

      <div class="keypad">
        <!-- Row 1 -->
        <button class="btn btn-function" @click="clearAll">AC</button>
        <button class="btn btn-function" @click="toggleSign">+/-</button>
        <button class="btn btn-memory" @click="memoryStore">MS</button>
        <button class="btn btn-memory" @click="memoryRecall">MR</button>
        <button class="btn btn-operator" :class="{ active: state.operator === '÷' }" @click="setOperator('÷')">÷</button>

        <!-- Row 2 -->
        <button class="btn btn-number" @click="inputDigit('7')">7</button>
        <button class="btn btn-number" @click="inputDigit('8')">8</button>
        <button class="btn btn-number" @click="inputDigit('9')">9</button>
        <button class="btn btn-operator" :class="{ active: state.operator === '×' }" @click="setOperator('×')">×</button>

        <!-- Row 3 -->
        <button class="btn btn-number" @click="inputDigit('4')">4</button>
        <button class="btn btn-number" @click="inputDigit('5')">5</button>
        <button class="btn btn-number" @click="inputDigit('6')">6</button>
        <button class="btn btn-operator" :class="{ active: state.operator === '-' }" @click="setOperator('-')">−</button>

        <!-- Row 4 -->
        <button class="btn btn-number" @click="inputDigit('1')">1</button>
        <button class="btn btn-number" @click="inputDigit('2')">2</button>
        <button class="btn btn-number" @click="inputDigit('3')">3</button>
        <button class="btn btn-operator" :class="{ active: state.operator === '+' }" @click="setOperator('+')">+</button>

        <!-- Row 5 -->
        <button class="btn btn-number btn-zero" @click="inputDigit('0')">0</button>
        <button class="btn btn-number" @click="inputDecimal">.</button>
        <button class="btn btn-equal" @click="calculate">=</button>
      </div>
    </div>

    <HistoryPanel :history="state.history" />
  </div>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue'
import type { Operator, CalculatorState } from '../types'
import HistoryPanel from './HistoryPanel.vue'

const state = reactive<CalculatorState>({
  display: '0',
  previousValue: '',
  operator: null,
  waitingForOperand: false,
  memory: 0,
  history: [],
})

const expression = computed(() => {
  if (state.operator && state.previousValue) {
    return `${state.previousValue} ${state.operator}`
  }
  return ''
})

function inputDigit(digit: string) {
  if (state.waitingForOperand) {
    state.display = digit
    state.waitingForOperand = false
  } else {
    state.display = state.display === '0' ? digit : state.display + digit
  }
}

function inputDecimal() {
  if (state.waitingForOperand) {
    state.display = '0.'
    state.waitingForOperand = false
    return
  }
  if (!state.display.includes('.')) {
    state.display += '.'
  }
}

function toggleSign() {
  const value = parseFloat(state.display)
  state.display = String(-value)
}

function setOperator(op: Operator) {
  const current = parseFloat(state.display)

  if (state.operator && !state.waitingForOperand) {
    const result = compute(parseFloat(state.previousValue), current, state.operator)
    state.display = formatResult(result)
  }

  state.previousValue = state.display
  state.operator = op
  state.waitingForOperand = true
}

function calculate() {
  if (!state.operator || !state.previousValue) return

  const prev = parseFloat(state.previousValue)
  const current = parseFloat(state.display)
  const result = compute(prev, current, state.operator)
  const resultStr = formatResult(result)

  addHistory(`${state.previousValue} ${state.operator} ${state.display}`, resultStr)

  state.display = resultStr
  state.previousValue = ''
  state.operator = null
  state.waitingForOperand = true
}

function compute(a: number, b: number, op: Operator): number {
  switch (op) {
    case '+': return a + b
    case '-': return a - b
    case '×': return a * b
    case '÷': return b !== 0 ? a / b : NaN
  }
}

function formatResult(value: number): string {
  if (isNaN(value)) return 'Erreur'
  if (!isFinite(value)) return 'Erreur'
  const str = String(value)
  return str.length > 10 ? parseFloat(value.toPrecision(10)).toString() : str
}

function clearAll() {
  state.display = '0'
  state.previousValue = ''
  state.operator = null
  state.waitingForOperand = false
}

function memoryStore() {
  state.memory = parseFloat(state.display)
}

function memoryRecall() {
  state.display = String(state.memory)
  state.waitingForOperand = false
}

function addHistory(expression: string, result: string) {
  state.history.unshift({ expression, result })
  if (state.history.length > 5) {
    state.history.pop()
  }
}
</script>

<style scoped>
.calculator-wrapper {
  display: flex;
  gap: 24px;
  align-items: flex-start;
}

.calculator {
  background: #1c1c1e;
  border-radius: 20px;
  padding: 20px;
  width: 320px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
}

.display {
  background: #2c2c2e;
  border-radius: 12px;
  padding: 16px 20px 12px;
  margin-bottom: 16px;
  min-height: 90px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  position: relative;
}

.display-expression {
  color: #8e8e93;
  font-size: 14px;
  min-height: 18px;
  margin-bottom: 4px;
}

.display-value {
  color: #fff;
  font-size: 40px;
  font-weight: 300;
  word-break: break-all;
  text-align: right;
  line-height: 1.1;
}

.memory-indicator {
  position: absolute;
  top: 10px;
  left: 14px;
  color: #ff9f0a;
  font-size: 12px;
  font-weight: 600;
}

.keypad {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}

.btn {
  border: none;
  border-radius: 12px;
  font-size: 20px;
  font-weight: 500;
  height: 64px;
  cursor: pointer;
  transition: filter 0.1s, transform 0.08s;
  font-family: inherit;
}

.btn:active {
  filter: brightness(1.3);
  transform: scale(0.95);
}

.btn-number {
  background: #3a3a3c;
  color: #fff;
}

.btn-number:hover {
  background: #48484a;
}

.btn-operator {
  background: #ff9f0a;
  color: #fff;
}

.btn-operator:hover {
  background: #ffb340;
}

.btn-operator.active {
  background: #fff;
  color: #ff9f0a;
}

.btn-function {
  background: #636366;
  color: #fff;
}

.btn-function:hover {
  background: #7c7c80;
}

.btn-memory {
  background: #5856d6;
  color: #fff;
  font-size: 16px;
}

.btn-memory:hover {
  background: #6e6cde;
}

.btn-equal {
  background: #ff9f0a;
  color: #fff;
}

.btn-equal:hover {
  background: #ffb340;
}

.btn-zero {
  grid-column: span 2;
}
</style>
