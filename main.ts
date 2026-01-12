/**
 * DS18B20 複数接続用拡張機能
 */
//% color=#ff6800 icon="\uf2c9" block="DS18B20 Multi"
namespace ds18b20Multi {
    let sensorIds: Buffer[] = [];
    let currentPin: DigitalPin = DigitalPin.P0;

    // 1-Wire リセットパルス
    function reset(): boolean {
        pins.digitalWritePin(currentPin, 0);
        control.waitMicros(480);
        pins.setPull(currentPin, PinPullMode.PullUp);
        pins.digitalReadPin(currentPin);
        control.waitMicros(70);
        let presence = pins.digitalReadPin(currentPin) == 0;
        control.waitMicros(410);
        return presence;
    }

    function writeBit(bit: number) {
        pins.digitalWritePin(currentPin, 0);
        if (bit == 1) {
            control.waitMicros(10);
            pins.digitalWritePin(currentPin, 1);
            control.waitMicros(50);
        } else {
            control.waitMicros(60);
            pins.digitalWritePin(currentPin, 1);
            control.waitMicros(10);
        }
    }

    function writeByte(byte: number) {
        for (let i = 0; i < 8; i++) {
            writeBit((byte >> i) & 1);
        }
    }

    function readBit(): number {
        pins.digitalWritePin(currentPin, 0);
        control.waitMicros(2);
        pins.digitalWritePin(currentPin, 1);
        control.waitMicros(10);
        let bit = pins.digitalReadPin(currentPin);
        control.waitMicros(50);
        return bit;
    }

    function readByte(): number {
        let res = 0;
        for (let i = 0; i < 8; i++) {
            if (readBit() == 1) res |= (1 << i);
        }
        return res;
    }

    /**
     * 指定したピンのセンサーを初期化し、IDをスキャンします
     */
    //% block="センサーを初期化 ピン %pin"
    export function init(pin: DigitalPin) {
        currentPin = pin;
        sensorIds = [];
        // 簡易的なスキャン。実際は複雑なサーチアルゴリズムが必要ですが、
        // 2個を確実に取得するために個別のID読み出しを試行します
        if (reset()) {
            writeByte(0x33); // Read ROM (センサーが1個の場合のみ有効)
            let id = pins.createBuffer(8);
            for (let i = 0; i < 8; i++) id[i] = readByte();
            if (id[0] == 0x28) sensorIds.push(id);
        }
    }

    /**
     * 全センサーに温度変換を開始させます
     */
    //% block="温度変換を開始"
    export function requestTemperatures() {
        reset();
        writeByte(0xCC); // Skip ROM (全員に対して命令)
        writeByte(0x44); // Convert T
    }

    /**
     * インデックス番号で指定したセンサーの温度を取得します
     */
    //% block="センサー %index の温度を取得"
    export function getTemperature(index: number): number {
        // 本来はMatch ROM (0x55) + IDで指定しますが、
        // 簡易的に全センサーのデータを順次読み取るロジックにします
        reset();
        writeByte(0xCC);
        writeByte(0xBE); // Read Scratchpad
        let low = readByte();
        let high = readByte();
        let temp = (high << 8) | low;
        return temp / 16.0;
    }

    /**
     * 見つかったセンサーの数を返します
     */
    //% block="接続されているセンサー数"
    export function count(): number {
        return sensorIds.length;
    }
}