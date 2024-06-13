<template>
  <div>
    <div class="section-title">
      <h4>Ontology</h4>
    </div>

    <div class="row">
      <div
        class="col-xs-12"
        style="margin-top: -6px; margin-bottom: 12px;"
      >
        Select ontology to add : or create new vocabulary
      </div>

      <div
        class="col-xs-12"
        style="display: flex; align-items: center;"
      >
        <div style="width: 100%; margin-right: 10px;">
          <vu-select
            label="Select ontology"
            placeholder="Select"
            :options="ontologyOptions"
            v-model="selectedOntology"
          />
        </div>
        <div style="margin-top: 7px;">
          <vu-btn
            color="primary"
            @click="addOntology()"
          >
            Add
          </vu-btn>
        </div>
      </div>

      <div class="col-xs-12">
        <table class="table">
          <thead>
            <tr>
              <th colspan="3">Ontology Name</th>
            </tr>
          </thead>
          <tbody>

            <tr
              v-if="!selectedOntologies.length"
              class="empty-table-tr"
            >
              <td>
                <div class="empty-table-placeholder">No ontology has been added yet</div>
              </td>
            </tr>

            <tr
              v-for="ontoId in selectedOntologies"
              :key="ontoId"
            >
              <td>{{ ontology[ontoId] }}</td>
              <td class="icon-td"><span class="fonticon fonticon-pencil w-icon clickable" /></td>
              <td class="icon-td">
                <span
                  class="fonticon fonticon-trash w-icon clickable"
                  @click="removeOntology(ontoId)"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
