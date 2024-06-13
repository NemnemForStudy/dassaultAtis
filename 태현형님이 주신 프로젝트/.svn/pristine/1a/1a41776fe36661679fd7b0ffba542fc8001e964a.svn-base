<template>
  <div class="categories-section section">
    <div class="section-title">
      <h4>{{ $t('categorySectionTitle') }}</h4>
    </div>

    <div
      class="categories section-content"
      v-mask="!isInitied"
    >
      <CategoryTile
        v-for="category in categories"
        :key="category.id"
        :category="category"
      />
    </div>
  </div>
</template>
