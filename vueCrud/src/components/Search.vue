<template>
    <input type="text" name="searchByName" id="searchByName" placeholder="Buscar por ID">
</template>

<script>

export default {
    name: 'Search'
}

</script>

<style>
input[type=text] {
    width: 240px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 12px;
    font-size: 14px;
    background-color: transparent;
    background-position: 10px 10px;
    background-repeat: no-repeat;
    padding: .5rem 1rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: width 0.4s ease-in-out;
}

input[type=text]:focus{
    border: 1px solid #064979;
}
</style>