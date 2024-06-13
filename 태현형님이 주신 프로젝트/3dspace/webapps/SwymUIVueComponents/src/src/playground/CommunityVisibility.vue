<template>
  <div>
    <SwymCommunityVisibility
      :visibility-model="visibilityModel"
      @employeesVisibilityChanged="onEmployeesVisibilityChanged"
      @contractorsVisibilityChanged="onContractorsVisibilityChanged"
      @blacklistChanged="onBlacklistChanged"
      :readOnly="readOnly"
    />

    <vu-btn @click="showData">
      Show data
    </vu-btn>
  </div>
</template>

<script>
import i18n from '../../assets/nls/i18n_en';

const readOnly = true;

const PUBLIC = 1;
const PRIVATE = 0;
const SECRET = 4;

const access = 1;
const extranetAccess = 4;

const blacklistByDefault = true;

const visibilityModel = {
  employees: {
    visibility: [{
      label: 'Public',
      value: `${PUBLIC}`,
      icon: 'globe',
      description: i18n.publicVisibility,
    },
    {
      label: 'Private',
      value: `${PRIVATE}`,
      icon: 'lock-open',
      description: i18n.privateVisibility,
    },
    {
      label: 'Secret',
      value: `${SECRET}`,
      icon: 'lock',
      description: i18n.secretVisibility,
    }],
    visibilitySelected: `${access}`,
    deactivateContentDisplayInWhatsNew: {
      label: 'Deactivate content display in What\'s new',
      value: 'test',
      disabled: access !== PUBLIC,
    },
    deactivateChecked: blacklistByDefault,
  },
  contractors: {
    visibility: [{
      label: 'Public',
      value: `${PUBLIC}`,
      disabled: access === PRIVATE || access === SECRET,
      icon: 'globe',
      description: i18n.publicVisibility,
    },
    {
      label: 'Private',
      value: `${PRIVATE}`,
      disabled: access === SECRET,
      icon: 'lock-open',
      description: i18n.privateVisibility,
    },
    {
      label: 'Secret',
      value: `${SECRET}`,
      icon: 'lock',
      description: i18n.secretVisibility,
    },
    {
      label: 'Disable',
      value: 'disable',
      icon: 'status-noway',
      description: i18n.disabledVisibility,

    }],
    visibilitySelected: `${extranetAccess}`,
  },
};

export default {
  name: 'CommunityVisibility',
  data: () => ({
    visibilityModel,
    readOnly
  }),
  methods: {
    onEmployeesVisibilityChanged(value) {
      const contractorsVisibility = visibilityModel.contractors;
      const contractorsPublicVisibility = visibilityModel.contractors.visibility[0];
      const contractorsPrivateVisibility = visibilityModel.contractors.visibility[1];
      const { deactivateContentDisplayInWhatsNew } = visibilityModel.employees;

      switch (value) {
        case `${PUBLIC}`:
          contractorsPublicVisibility.disabled = false; // Public
          contractorsPrivateVisibility.disabled = false; // Private

          deactivateContentDisplayInWhatsNew.disabled = false;
          break;
        case `${PRIVATE}`:
          contractorsPublicVisibility.disabled = true; // Public
          contractorsPrivateVisibility.disabled = false; // Private

          if (contractorsVisibility.visibilitySelected == `${PUBLIC}`) {
            contractorsVisibility.visibilitySelected = `${PRIVATE}`;
          }

          visibilityModel.employees.deactivateChecked = null;
          deactivateContentDisplayInWhatsNew.disabled = true;
          break;
        case `${SECRET}`:
          contractorsPublicVisibility.disabled = true; // Public
          contractorsPrivateVisibility.disabled = true; // Private

          if (
            contractorsVisibility.visibilitySelected == `${PUBLIC}`
						|| contractorsVisibility.visibilitySelected == `${PRIVATE}`
          ) {
            contractorsVisibility.visibilitySelected = `${SECRET}`;
          }

          visibilityModel.employees.deactivateChecked = null;
          deactivateContentDisplayInWhatsNew.disabled = true;
          break;
      }

      visibilityModel.employees.visibilitySelected = value;
    },

    onContractorsVisibilityChanged(value) {
      visibilityModel.contractors.visibilitySelected = value;
    },

    onBlacklistChanged(checked) {
      visibilityModel.employees.deactivateChecked = checked;
    },

    showData() {
      console.log('###SwymCommunityVisibility: showData');
      console.log(this.$data);
      console.log(visibilityModel);
    },
  },
};
</script>

<style>

</style>
