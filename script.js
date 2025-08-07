const offers = document.querySelectorAll(".offer-item");
const collection = document.querySelectorAll(".collection-item");
const support = document.querySelectorAll(".why-card");
const heading = document.querySelector(".greeting");
const about = document.querySelector(".about");
const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            entry.target.classList.add('animate');
        }
        else{
            entry.target.classList.remove('animate');
        }
    });
},
);
offers.forEach(box=>{
        observer.observe(box)
 });
collection.forEach(box=>{
        observer.observe(box)
 });
support.forEach(box=>{
        observer.observe(box)
 });
observer.observe(heading)
observer.observe(about)

let cartCount = 0;
document.querySelectorAll('.cart-btn').forEach(button => {
  button.addEventListener('click', () => {
    cartCount++;
    console.log(cartCount)
    document.getElementById('cart-count').textContent = cartCount;
  });
});
const scrollerInner = document.querySelector('.scroller__inner');
const items = [...scrollerInner.children];

items.forEach(item => {
  const clone = item.cloneNode(true);
  clone.setAttribute('aria-hidden', true);
  scrollerInner.appendChild(clone);
});

