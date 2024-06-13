<template>
  <div>
    <div class="section-title">
      <h4>{{ $t('vocabularySectionTitle') }}</h4>
    </div>

    <div class="row">
      <div
        class="col-xs-12"
        style="margin-top: -6px; margin-bottom: 12px;"
      >
        {{ $t('vocabularySectionSubtitle') }}
      </div>

      <div
        class="col-xs-12 vocab-ctn"
        :style="vocabCtnStyle"
        ref="vocabCtnEl"
      >
        <div
          class="vocab-form"
          :style="vocabFormStyle"
        >
          <div class="vocab-sixw vocab-form-part">
            <vu-select
              :label="$t('6WInputLabel')"
              :placeholder="$t('6WInputPlaceholder')"
              :options="vocabSixWOptions"
              v-model="vocabModel.sixW"
            />
          </div>
          <div class="vocab-name vocab-form-part">
            <vu-input
              :label="$t('vocabularyNameInputLabel')"
              v-model="vocabModel.name"
            />
          </div>
          <div class="vocab-type vocab-form-part">
            <vu-select
              :label="$t('vocabularyTypeInputLabel')"
              :placeholder="$t('vocabularyTypePlaceholder')"
              :options="vocabTypeOptions"
              v-model="vocabModel.type"
            />
          </div>
          <div class="vocab-value vocab-form-part">
            <vu-input
              :label="vocabValueLabel"
              v-model="vocabModel.value"
            />
          </div>
          <div class="vocab-add-btn vocab-form-part">
            <vu-btn
              v-if="!editVocab"
              color="primary"
              @click="addVocabulary()"
            >
              {{ $t('addVocabularyBtnText') }}
            </vu-btn>
            <vu-btn
              v-if="editVocab"
              class="edit-btn"
              color="primary"
              @click="onEditVocabulary(true)"
            >
              {{ $t('editVocabularyBtnText') }}
            </vu-btn>
            <vu-btn
              v-if="editVocab"
              @click="onEditVocabulary(false)"
            >
              {{ $t('cancelVocabularyBtnText') }}
            </vu-btn>
          </div>
        </div>

        <div
          :class="['vocab-list', { 'editing': editVocab }]"
          v-mask="editVocab"
        >
          <div class="div-table">
            <div class="div-th div-tr">
              <div class="div-td vocab-list-sixw">
                {{ $t('6WTHLabel') }}
              </div>
              <div class="div-td vocab-list-name">
                {{ $t('vocabularyNameTHLabel') }}
              </div>
              <div class="div-td vocab-list-type">
                {{ $t('vocabularyTypeTHLabel') }}
              </div>
              <div class="div-td vocab-list-value">
                {{ $t('vocabularyValuesTHLabel') }}
              </div>
            </div>

            <div
              v-if="!vocabularies.length"
              class="div-td empty-table-div-tr empty-table-tr"
            >
              <div class="empty-table-div-td empty-table-placeholder">
                {{ $t('emptyVocabulariesLabel') }}
              </div>
            </div>

            <div
              class="div-tr"
              v-for="vocab in vocabularies"
              :key="vocab.id"
            >
              <div class="div-td vocab-list-sixw">
                <span :class="['fonticon w-icon sixw-icon', getSixWIcon(vocab.sixW)]" />
                {{ getSixWLabel(vocab.sixW) }}
              </div>
              <div class="div-td vocab-list-name">
                {{ vocab.name }}
              </div>
              <div class="div-td vocab-list-type">
                {{ getVocabTypeLabel(vocab.type) }}
              </div>
              <div class="div-td vocab-list-value">
                {{ vocab.value }}
              </div>
              <div class="div-td icon-td">
                <span
                  class="fonticon fonticon-pencil w-icon clickable"
                  @click="editVocabulary($event, vocab.id)"
                />
              </div>
              <div class="div-td icon-td">
                <span
                  class="fonticon fonticon-trash w-icon clickable"
                  @click="removeVocabulary(vocab.id)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
