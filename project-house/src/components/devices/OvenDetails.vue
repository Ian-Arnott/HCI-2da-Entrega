<template>
    <v-container>
        <v-icon size="100px">mdi-stove</v-icon>
        <p>{{ device.state.status }}</p>
        <v-row>
            <v-col>
                <v-select
                :items="heatModes"
                persistent-placeholder
                :placeholder="heat"
                label="Heat Source"
                v-model="heat"
                @change="setHeatMode()"
                ></v-select>
            </v-col>
            <v-col>
                <v-btn :disabled="disabled" color="primary" large fab @click="turnOnOff()">
                    <v-icon large>{{statusIcon}}</v-icon>
                </v-btn>
            </v-col>
            <v-col>
                <v-slider
                class="mt-4"
                v-model="temperature"
                :min="minTemp"
                :max="maxTemp"
                step="1"
                :prepend-icon="tempIcon"
                thumb-label="always"
                @end="setTemp()"
                >
                    <template v-slot:thumb-label="{ value }">
                        {{value}}°C
                    </template>
                </v-slider>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-select
                :items="grillModes"
                persistent-placeholder
                :placeholder="grill"
                label="Grill Mode"
                v-model="grill"
                @change="setGrill()"
                >
                </v-select>
            </v-col>
            <v-col>
                <v-select
                :items="convectionModes"
                persistent-placeholder
                :placeholder="convection"
                label="Convection Mode"
                v-model="convection"
                @change="setConvection()"
                >
                </v-select>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    props: {
        device: {
            required: true,
        },
        disabled: Boolean,
    },

    data () {
        return {
            states: this.$store.getters['getDeviceStates']('oven'),
            temperature: this.device.state.temperature,
            minTemp: 90,
            maxTemp: 230,
            heat: this.device.state.mode,
            heatModes: ["Conventional", "Top", "Bottom"],
            grill: this.device.state.grill,
            grillModes: ["Off", "On", "Complete"],
            convection: this.device.state.convection,
            convectionModes: ["Off", "On", "Complete"],
        };
    },
    
    computed: {
        statusIcon() {
            let icon = "mdi-power-off"
            if (this.device.state.status == 'on') icon = "mdi-power-on"
            return icon
        },
        tempIcon() {
            let icon = "mdi-thermometer-low"
            if (this.temperature > 90) icon = "mdi-thermometer-low"
            if (this.temperature >= 130) icon = "mdi-thermometer"
            if (this.temperature >= 160) icon = "mdi-thermometer-high"
            return icon
        },
    },

    methods: {
        ...mapActions("devices", {
            execute: "action",
            getState: "getState",
        }),
        turnOnOff() {
            let action
            switch (this.device.state.status) {
                case 'off':
                    action = 'turnOn'
                    break;
                case 'on':
                    action = 'turnOff'
                    break;
                default:
                    action = 'turnOff'
                    break;
            }
            this.$emit('action', { id: this.device.id, actionName: action})
        },
        setHeatMode() {
            this.$emit('action', {
                id: this.device.id,
                actionName: "setHeat",
                params: [this.heat.toLowerCase()]
            })
        },
        setGrill() {
            this.$emit('action', {
                id: this.device.id,
                actionName: "setGrill",
                params: [this.grill.toLowerCase()]
            })
        },
        setConvection() {
            this.$emit('action', {
                id: this.device.id,
                actionName: "setConvection",
                params: [this.convection.toLowerCase()]
            })
        },
        setTemp() {
            this.$emit('action', {
                id: this.device.id,
                actionName: "setTemperature",
                params: [this.temperature]
            })
        },
    },
}
</script>