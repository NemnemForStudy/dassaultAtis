<template>
  <div
    :class="['category-tile', { 'selected': isSelected }]"
    :style="getStyles()"
    @click="onClick(category.id)"
  >
    <!-- <img :src="getSrc(category.image)" draggable="false"> -->
    <div class="label-category">
      {{ category.label }}
    </div>
    <div class="check">
      <span class="fonticon fonticon-check" />
    </div>
  </div>
</template>
