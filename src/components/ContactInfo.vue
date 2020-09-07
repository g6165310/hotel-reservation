<template>
  <div class="contactInfo">
    <div class="social">
      <a href="#">
        <img src="../assets/facebook-square-brands.svg" alt />
      </a>
      <a href="#">
        <img src="../assets/instagram-brands.svg" alt />
      </a>
    </div>
    <div class="contact-list">
      <ul>
        <li>
          <img src="../assets/phone-alt-solid.svg" alt />02-17264937
        </li>
        <li>
          <img src="../assets/envelope-solid.svg" alt />whitespace@whitespace.com.tw
        </li>
        <li>
          <img src="../assets/home-solid.svg" alt />台北羅斯福路十段30號
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "ContactInfo"
};
</script>
<style lang="scss" scoped>
.contactInfo {
  position: absolute;
  bottom: 75px;
  right: 30px;
  @include font(14, null, null, null, #fff);
  padding: 12px;
}
.social {
  @include clearfix;
  margin-bottom: 50px;
  a {
    width: 20px;
    height: 20px;
    display: block;
    float: left;
    img {
      width: 100%;
      height: 100%;
    }
    &:first-child {
      margin-right: 10px;
    }
  }
}
.contact-list {
  li {
    text-align: left;
    margin-bottom: 12px;
    &:last-child {
      margin-bottom: 0px;
    }
  }
  img {
    width: 20px;
    height: 20px;
    margin-right: 12px;
    vertical-align: text-bottom;
  }
}
//RWD
@media (max-width: 767px) {
  .contactInfo {
    bottom: 25px;
  }
  .social {
    margin-bottom: 25px;
  }
}
@media (max-width: 414px) {
  .contactInfo {
    bottom: 0px;
    right: 0;
    left: 0;
  }
}
</style>
