<template>
  <div class="roles-section section">
    <div class="section-title">
      <h4>{{ $t('rolesSectionTitle') }}</h4>
    </div>

    <div class="section-content">
      <form
        @submit.prevent="addRole"
        class="form-add-role"
      >
        <div class="input-add-role-ctn">
          <vu-input
            v-model.trim="inputRole"
            :rules="[checkInputRole]"
            ref="inputAddRole"
            class="input-add-role"
            :label="$t('addRoleInputLabel')"
          />
        </div>
        <div class="btn-add-role-ctn">
          <vu-btn
            @click="addRole"
            color="primary"
          >
            {{ $t('addRoleBtnText') }}
          </vu-btn>
        </div>
      </form>

      <table class="table">
        <thead>
          <tr>
            <th colspan="2">{{ $t('roleNameTHLabel') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-if="!roles.length"
            class="empty-table-tr"
          >
            <td>
              <div class="empty-table-placeholder">
                {{ $t('emptyRolesLabel') }}
              </div>
            </td>
          </tr>

          <tr
            v-for="roleId in roles"
            :key="roleId"
          >
            <td>{{ roleId }}</td>
            <td class="icon-td">
              <!-- Allow to edit role. -->
              <span
                class="fonticon fonticon-trash w-icon clickable"
                @click="removeRole(roleId)"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
