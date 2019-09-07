<template>
  <div>
    <div class="l-banner">
      <div class="c-banner">
        <div class="c-banner__text">
          <p>Whatever is worth doing is worth doing well.</p>
        </div>
      </div>
    </div>
    <div class="container py-4 mt-4">
      <div class="text-center h3 text-title">關於我們</div>
      <div class="text-center mt-4">我們常常旅遊，因喜愛動物，用攝影記錄了這些美好可愛的動物，<br>將這些寶貴的畫面記錄下來製作成 <span class="text-sub">明信片</span> 分享給你們。</div>
      <div class="mt-4 text-center mt-4">
        <div class="py-4">
          <div class="row">
            <div class="col-md-3">
              <div class="mx-auto mb-5">
                <div class="d-flex">
                  <span class="icon-bg rounded-circle mx-auto mb-3">
                    <i class="fas fa-heart m-auto"></i> 
                  </span>
                </div>
                <div class="h5">珍惜動物</div>
              </div>
            </div>
            <div class="col-md-3">
              <div class="mx-auto mb-5">
                <div class="d-flex">
                  <span class="icon-bg rounded-circle mx-auto mb-3">
                    <i class="fas fa-shoe-prints m-auto"></i> 
                  </span>
                </div>
                <div class="h5">親自前往</div>
              </div>
            </div>
            <div class="col-md-3">
              <div class="mx-auto mb-5">
                <div class="d-flex">
                  <span class="icon-bg rounded-circle mx-auto mb-3">
                    <i class="fas fa-smile m-auto"></i> 
                  </span>
                </div>
                <div class="h5">分享喜悅</div>
              </div>
            </div>
            <div class="col-md-3">
              <div class="mx-auto mb-5">
                <div class="d-flex">
                  <span class="icon-bg rounded-circle mx-auto mb-3">
                    <i class="fas fa-user-friends m-auto"></i>
                  </span>
                </div>
                <div class="h5">連結關係</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container l-sale">
      <div class="c-sale d-flex flex-wrap">
        <div class="c-sale__img">
          <img src="~@/../static/images/sale4.jpg">
          <img src="~@/../static/images/sale5.jpg">
          <img src="~@/../static/images/sale6.jpg">
          <img src="~@/../static/images/sale7.jpg">
        </div>
        <div class="c-sale__text">
          <div class="h3 text-underline">中秋限定・限時優惠</div>
            <div class="l-timer">
              <div class="l-coupon mb-4">結帳時輸入 <span class="text-coupon text-sub">iloveturtle</span> <br>即可享有<span class="text-sub"> 9折 </span>優惠!</div>
              <div id="timer" class="c-time">
                <div id="days" class="c-time__item"></div>
                <div>天</div>
                <div id="hours" class="c-time__item"></div>
                <div>小時</div>
                <div id="minutes" class="c-time__item"></div>
                <div>分鐘</div>
                <div id="seconds" class="c-time__item"></div>
                <div>秒</div>
              </div>
              <router-link class="nav-link" to="/ProductsList">
                <button class="btn bg-sub btn-hover text-white goshop-btn">逛逛商店 →</button>
              </router-link>
              
            </div>
        </div>
      </div>
    </div>
    <div class="container py-5">
      <div class="text-center h3 text-title">最新上架</div>
      <div class="d-flex flex-wrap justify-content-center">
        <ProductHome></ProductHome>
        <router-link class="nav-link" to="/ProductsList">
          <button class="btn bg-sub btn-hover text-white mt-4">看更多商品</button>
        </router-link>
      </div>
    </div>
    <div class="bg-sub text-white py-5 mt-4">
      <div class="c-newsletter">
        <div class="c-newsletter__title">
          <div class="h4"><i class="fas fa-paper-plane"></i> 關注我們的旅遊</div>
        </div>
        <div class="c-newsletter__item">
          <div class="input-group input-group-sm ">
            <input type="text" class="form-control" placeholder="請輸入Email">
            <div class="input-group-append">
              <button class="btn bg-yellow btn-hover" type="button">
                送出
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import $ from 'jquery';
import ProductHome from './pages/productHome';

export default {
  components: {
    ProductHome,
  },
  data() {
    return {
    }
  },
  mounted() {
    function makeTimer() {
    var endTime = new Date("30 September 2019 23:59:59 GMT+08:00");
      endTime = (Date.parse(endTime) / 1000);

        var now = new Date();
        now = (Date.parse(now) / 1000);

        var timeLeft = endTime - now;
        if(timeLeft > 0){
        var days = Math.floor(timeLeft / 86400); 
        
        var hours = Math.floor((timeLeft - (days * 86400)) / 3600);
        var minutes = Math.floor((timeLeft - (days * 86400) - (hours * 3600 )) / 60);
        var seconds = Math.floor((timeLeft - (days * 86400) - (hours * 3600) - (minutes * 60)));

        if (hours < "10") { hours = "0" + hours; }
        if (minutes < "10") { minutes = "0" + minutes; }
        if (seconds < "10") { seconds = "0" + seconds; }
        
        $("#days").html(days);
        $("#hours").html(hours);
        $("#minutes").html(minutes);
        $("#seconds").html(seconds);	

      } else {
        $(".sale").hide();
      }
	}
	setInterval(function() { makeTimer(); }, 1000);
  },
}
</script>