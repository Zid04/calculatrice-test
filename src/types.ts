export type Operator = '+' | '-' | '×' | '÷'

export interface HistoryEntry {
  expression: string
  result: string
}

export interface CalculatorState {
  display: string
  previousValue: string
  operator: Operator | null
  waitingForOperand: boolean
  memory: number
  history: HistoryEntry[]
}
