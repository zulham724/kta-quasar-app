<template>
  <div>
    <q-header elevated>
      <q-toolbar class="bg-white">
        <q-icon name="apps" color="teal" size="sm" />
        <q-toolbar-title>
          <div class="text-body1 text-teal text-bold">Fitur</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <q-list bordered separator>
        <q-item clickable v-ripple>
          <q-item-section>Kartu Tanda Anggota</q-item-section>
        </q-item>
        <q-item clickable v-ripple>
          <q-item-section>
            Buku Digital
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple>
          <q-item-section>
            Murottal
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple>
          <q-item-section>
            Doa Harian
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple>
          <q-item-section>
            RPP Digital
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple>
          <q-item-section>
            Penilaian Digital
          </q-item-section>
        </q-item>
      </q-list>
    </q-page-container>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
