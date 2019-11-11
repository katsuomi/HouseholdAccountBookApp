# HouseholdAccountBookApp

## 💬 About
You can easily understand the balance of payments by HouseholdAccountBookApp.

## 💁‍♂️demo
![household](https://user-images.githubusercontent.com/36298285/68585511-cb0e4580-04c5-11ea-80b5-8dd4bab100f7.gif)

## 🌻 Version

||Name|Version|What|
|:-:|:-:|:-:|:-|
|frontend|JavaScript||高級言語|
||npm|6.7.0|パッケージ管理システム|
||React.js|16.11.0|JavaScriptライブラリ|
||firesotre||データベース|

## 🔰 Install & Setup

#### 1. Dockerのダウンロード

下記より、`Docker For Mac` か `Docker For Windows`をインストールして下さい。  
[https://docs.docker.com/install/](https://docs.docker.com/install/)

#### 2. ソースコードの取得

```bash
git clone https://github.com/katsuomi/HouseholdAccountBookApp.git
cd HouseholdAccountBookApp
```

#### 3. 起動

下記の手順で、コンテナを起動させて下さい。

```bash
# Dockerイメージの作成
$ docker-compose build

# Dockerコンテナの起動
$ docker-compose up -d

# 確認
$ docker-compose ps
```

下記のコンテナが起動していれば、OKです。

|host||
|:-:|:-:|
|frontend|[http://localhost:3000](http://localhost:3000)|
