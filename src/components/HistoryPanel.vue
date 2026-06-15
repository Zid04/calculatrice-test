<template>
  <div class="history-panel">
    <h3 class="history-title">Historique</h3>
    <div v-if="history.length === 0" class="history-empty">
      Aucune opération
    </div>
    <ul v-else class="history-list">
      <li
        v-for="(entry, index) in history"
        :key="index"
        class="history-item"
        :class="{ 'history-item--latest': index === 0 }"
      >
        <span class="history-expression">{{ entry.expression }}</span>
        <span class="history-equals">= {{ entry.result }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { HistoryEntry } from '../types'

defineProps<{
  history: HistoryEntry[]
}>()
</script>

<style scoped>
.history-panel {
  background: #1c1c1e;
  border-radius: 20px;
  padding: 20px;
  width: 220px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  min-height: 200px;
}

.history-title {
  color: #ff9f0a;
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin: 0 0 16px;
}

.history-empty {
  color: #48484a;
  font-size: 14px;
  text-align: center;
  margin-top: 32px;
}

.history-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.history-item {
  background: #2c2c2e;
  border-radius: 10px;
  padding: 10px 14px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  border-left: 3px solid #3a3a3c;
  transition: border-color 0.2s;
}

.history-item--latest {
  border-left-color: #ff9f0a;
}

.history-expression {
  color: #8e8e93;
  font-size: 13px;
}

.history-equals {
  color: #fff;
  font-size: 18px;
  font-weight: 500;
}
</style>
