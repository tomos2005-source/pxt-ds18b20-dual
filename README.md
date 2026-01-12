# pxt-ds18b20-dual

micro:bitで複数のDS18B20温度センサーを使用するための拡張機能です。

## 回路図
DS18B20のDataピンとVCCの間に4.7kΩのプルアップ抵抗を入れてください。

## 使い方
1. `DS18B20を初期化` ブロックでピンを指定します。
2. `温度変換を開始` ブロックを呼び出します。
3. 750ms以上待機した後、`温度(℃)を取得` ブロックで値を出力します。

## 注意事項
この拡張機能は簡易版です。同一ピンに2個接続して個別に識別するには、各センサーのROM IDを指定するロジックが必要です。


> このページを開く [https://tomos2005-source.github.io/pxt-ds18b20-dual/](https://tomos2005-source.github.io/pxt-ds18b20-dual/)

## 拡張機能として使用

このリポジトリは、MakeCode で **拡張機能** として追加できます。

* [https://makecode.microbit.org/](https://makecode.microbit.org/) を開く
* **新しいプロジェクト** をクリックしてください
* ギアボタンメニューの中にある **拡張機能** をクリックしてください
* **https://github.com/tomos2005-source/pxt-ds18b20-dual** を検索してインポートします。

## このプロジェクトを編集します

MakeCode でこのリポジトリを編集します。

* [https://makecode.microbit.org/](https://makecode.microbit.org/) を開く
* **読み込む** をクリックし、 **URLから読み込む...** をクリックしてください
* **https://github.com/tomos2005-source/pxt-ds18b20-dual** を貼り付けてインポートをクリックしてください

#### メタデータ (検索、レンダリングに使用)

* for PXT/microbit
<script src="https://makecode.com/gh-pages-embed.js"></script><script>makeCodeRender("{{ site.makecode.home_url }}", "{{ site.github.owner_name }}/{{ site.github.repository_name }}");</script>
