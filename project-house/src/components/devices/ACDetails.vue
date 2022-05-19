<template>
    <v-container>
        <v-icon size="100px">mdi-air-conditioner</v-icon>
        <p>{{ device.state.status }}</p>
        <v-row>
            <v-col>
                <v-select
                :items="modes"
                persistent-placeholder
                :placeholder="mode"
                label="Mode"
                v-model="mode"
                @change="setMode()"
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
                :items="verticalModes"
                persistent-placeholder
                :placeholder="verticalSwing"
                label="Vertical Swing"
                v-model="verticalSwing"
                @change="setVertical()"
                >
                </v-select>
            </v-col>
            <v-col>
                <v-select
                :items="horizontalModes"
                persistent-placeholder
                :placeholder="horizontalSwing"
                label="Horizontal Swing"
                v-model="horizontalSwing"
                @change="setHorizontal()"
                >
                </v-select>
            </v-col>
            <v-col>
                <v-select
                :items="speedModes"
                persistent-placeholder
                :placeholder="speed"
                label="Fan Speed"
                v-model="speed"
                @change="setSpeed()"
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
            states: this.$store.getters['getDeviceStates']('ac'),
            temperature: this.device.state.temperature,
            minTemp: 18,
            maxTemp: 38,
            mode: this.device.state.mode,
            modes: ["Fan", "Heat", "Cold"],
            verticalSwing: this.device.state.verticalSwing,
            verticalModes: ["Auto", "22°", "45°", "67°", "90°"],
            horizontalSwing: this.device.state.horizontalSwing,
            horizontalModes: ["Auto", "-90°", "-45°", "0°", "45°", "90°"],
            speed: this.device.state.fanSpeed,
            speedModes: ["Auto", "25%", "50%", "75%", "100%"],
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
            if (this.temperature > 18) icon = "mdi-thermometer-low"
            if (this.temperature >= 24) icon = "mdi-thermometer"
            if (this.temperature >= 30) icon = "mdi-thermometer-high"
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
        setMode() {
            this.$emit('action', {
                id: this.device.id,
                actionName: "setMode",
                params: [this.mode.toLowerCase()]
            })    
        },
        setVertical() {
            this.$emit('action', {
                id: this.device.id,
                actionName: "setVerticalSwing",
                params: [this.verticalSwing.toLowerCase()]
            })
        },
        setHorizontal() {
            this.$emit('action', {
                id: this.device.id,
                actionName: "setHorizontalSwing",
                params: [this.horizontalSwing.toLowerCase()]
            })
        },
        setTemp() {
            this.$emit('action', {
                id: this.device.id,
                actionName: "setTemperature",
                params: [this.temperature]
            })
        },
        setSpeed() {
            this.$emit('action', {
                id: this.device.id,
                actionName: "setFanSpeed",
                params: [this.speed]
            })
        },
    },
}
</script>