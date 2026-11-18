/* JARVIS Orbital · by fls-dev · https://github.com/fls-dev */
/* JARVIS · charts: dependency-free SVG. JV.chart.bars / line / spark */
(function(){
  const NS = 'http://www.w3.org/2000/svg';
  const defs = `<defs><linearGradient id="iceFade" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8BE9FF" stop-opacity=".32"/><stop offset="1" stop-color="#8BE9FF" stop-opacity="0"/></linearGradient><linearGradient id="barFade" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#B9D4FF" stop-opacity=".38"/><stop offset="1" stop-color="#B9D4FF" stop-opacity=".06"/></linearGradient><linearGradient id="barHi" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#E6FBFF"/><stop offset=".5" stop-color="#8BE9FF"/><stop offset="1" stop-color="#FFB36B" stop-opacity=".5"/></linearGradient></defs>`;
  function svg(el, w, h, inner, label){ el.innerHTML = `<svg class="chart" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" style="height:${h}px" role="img" aria-label="${label||'chart'}">${defs}${inner}</svg>`; }
  /* bars(el, values, {h, hi:'last'|'max'|index, labels:[...], gap}) */
  function bars(el, v, o={}){
    const w = 100*v.length, h = o.h || 160, max = Math.max(...v)*1.08, g = o.gap ?? 18;
    const hiI = o.hi==='max' ? v.indexOf(Math.max(...v)) : o.hi==='last' || o.hi===undefined ? v.length-1 : o.hi;
    let s = '';
    v.forEach((x,i) => { const bh = Math.max(2, x/max*h); s += `<rect class="bar ${i===hiI?'hi':''}" x="${i*100+g/2}" y="${h-bh}" width="${100-g}" height="${bh}" rx="6"><title>${o.fmt?o.fmt(x):x}</title></rect>`; });
    svg(el, w, h, s, o.label);
  }
  /* line(el, [series...], {h, area:true, dashed2:true}) */
  function line(el, series, o={}){
    const w = 1000, h = o.h || 220, all = series.flat(), max = Math.max(...all)*1.05, min = o.min ?? Math.min(...all)*.95;
    const path = s => s.map((x,i) => `${i?'L':'M'}${(i/(s.length-1)*w).toFixed(1)},${(h - (x-min)/(max-min)*h).toFixed(1)}`).join(' ');
    let g = ''; for(let i=1;i<4;i++) g += `<line class="axis" x1="0" x2="${w}" y1="${h*i/4}" y2="${h*i/4}" vector-effect="non-scaling-stroke"/>`;
    const p0 = path(series[0]);
    let s = g + (o.area!==false ? `<path class="area" d="${p0} L${w},${h} L0,${h}Z"/>` : '') + `<path class="line" d="${p0}" vector-effect="non-scaling-stroke"/>`;
    if(series[1]) s += `<path class="line2" d="${path(series[1])}" vector-effect="non-scaling-stroke"/>`;
    const lx = w, ly = h - (series[0].at(-1)-min)/(max-min)*h;
    svg(el, w, h, s, o.label);
    el.style.position='relative';
    el.insertAdjacentHTML('beforeend', `<span aria-hidden="true" style="position:absolute;right:-5px;top:calc(${ly/h*100}% - 5px);width:10px;height:10px;border-radius:50%;background:var(--ice);box-shadow:0 0 0 4px rgba(139,233,255,.2),0 0 16px var(--ice)"></span>`);
  }
  function spark(el, v, o={}){ line(el, [v], { h:o.h||40, area:o.area }); }
  JV.chart = { bars, line, spark };
  JV.use(() => {
    JV.$$('[data-chart]').forEach(el => {
      const v = el.dataset.values.split(',').map(Number);
      ({ bars, line:(e,x)=>line(e,[x]), spark })[el.dataset.chart](el, v);
    });
  });
})();
