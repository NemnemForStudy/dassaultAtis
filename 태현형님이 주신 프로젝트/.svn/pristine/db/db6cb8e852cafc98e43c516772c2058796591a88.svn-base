<template>
  <div class="method-form">
    <div
      v-if="isMethodConfirmed"
      class="method-confirmed"
    >
      <vu-message
        :show="true"
        color="success"
        :closable="false"
      >
        <h3 class="success-message">
          {{ $t('methodSavedWithSuccess') }}
        </h3>
        <div
          class="go-back-to-edit-message"
          @click="goBackToEditMethod"
        >
          <vu-btn color="link">{{ $t('goBackToEditModeMethod') }}</vu-btn>
        </div>
      </vu-message>
    </div>

    <div
      ref="scrollableContent"
      class="scrollable-content col-xs-12"
    >
      <div
        v-if="isMethodConfirmed"
        class="overlay"
        :style="overlayStyles"
      ></div>

      <div class="row generic-info-method">
        <div class="app-tile-ctn">
          <AppTile
            :appId="appId"
            :interaction="false"
          />
        </div>
        <div class="col-xs-12">
          <vu-input
            class="method-name"
            v-model.trim="name"
            @input="onNameChange"
            :label="$t('methodName')"
          />
        </div>

        <div class="col-xs-12">
          <vu-textarea
            class="method-description"
            v-model.trim="description"
            :label="$t('methodDescription')"
            rows="4"
            @input="onDescriptionChange"
          />
        </div>
      </div>

      <div class="row method-content-section">
        <v-form
          v-if="isMethodFetched && formSchema"
          v-model="isFormValid"
          ref="form"
          @submit.prevent=""
          class="method-v-form col-xs-12"
        >
          <v-jsf
            v-model="formModel"
            :schema="formSchema"
            :options="formOptions"
            @input="setOverlayStyles"
          >
            <!--
            Custom slots name have to start with "custom-"
            else they are not take into acount!
            -->
            <template
              slot="custom-ds-3dsearch-input"
              slot-scope="context"
            >
              <Vjsf3DSearchInput
                v-bind="context"
                :assets="assets"
                :assetErrors="assetErrors"
                @change="onVjsf3DSearchInputChange"
                @remove="onVjsf3DSearchInputRemove"
                @validate="validateForm"
              />
            </template>
            <template
              slot="custom-ds-file-input"
              slot-scope="context"
            >
              <VjsfFileInput
                v-bind="context"
                :files="files"
                :fileErrors="fileErrors"
                @change="onVjsfFileInputChange"
                @remove="onVjsfFileInputRemove"
                @validate="validateForm"
              />
            </template>
            <template
              slot="custom-ds-roles-input"
              slot-scope="context"
            >
              <VjsfRolesInput
                v-bind="context"
                @validate="validateForm"
              />
            </template>
          </v-jsf>
        </v-form>

        <div
          v-if="isMethodFetching"
          class="method-form-fetching masked"
        >
          <vu-spinner
            mask
            :text="$t('loadingForm')"
          />
        </div>

        <div
          v-if="isMethodFailedToFetch"
          class="method-form-error"
        >
          <vu-message
            :show="true"
            color="error"
            :closable="false"
          >
            {{ $t('failToFetchMethod') }}
          </vu-message>
        </div>
      </div>
    </div>

    <div
      v-if="!isMethodConfirmed"
      class="method-confirm-btns"
    >
      <vu-btn
        v-if="isMethodFetched"
        class="btn confirm-btn"
        color="primary"
        :disabled="!isFormValid"
        @click="onConfirmBtnClick()"
      >
        {{ $t('saveBtn') }}
      </vu-btn>

      <vu-btn
        class="btn cancel-btn"
        @click="onCancelBtnClick()"
      >
        {{ $t('cancelBtn') }}
      </vu-btn>
    </div>
  </div>
</template>
