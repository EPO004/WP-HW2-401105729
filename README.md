
# اپلیکیشن طراحی

این یک اپلیکیشن طراحی مبتنی بر وب است که به کاربران این امکان را می‌دهد که اشکال را به راحتی بر روی canvas بکشند، آنها را حذف کنند و طراحی‌های خود را Export یا Import کنند. این اپلیکیشن با استفاده از **React** ساخته شده و از **CSS** برای طراحی استفاده می‌کند. کاربران می‌توانند اشکال مختلف (مربع، دایره، مثلث) را از Sidebar انتخاب کرده و آنها را بر روی canvas قرار دهند. همچنین، اپلیکیشن قابلیت ذخیره کردن طراحی‌ها به صورت فایل JSON و بارگذاری طراحی‌های قبلی را دارد.

## ویژگی‌ها

- **ویژگی Drag and Drop**: کاربران می‌توانند اشکال را از نوار ابزار بکشند و بر روی canvas قرار دهند.
- **شمارش اشکال**: تعداد هر نوع از اشکال قرار داده شده بر روی canvas نمایش داده می‌شود.
- **حذف اشکال**: کاربران می‌توانند هر شکل را با دوبار کلیک کردن بر روی آن حذف کنند.
- **قابلیت Export/Import**: کاربران می‌توانند طراحی‌های خود را به عنوان یک فایل JSON ذخیره کنند و طراحی‌های ذخیره شده قبلی را بارگذاری کنند.

## ساختار پروژه

پروژه با نمای کلی، به صورت زیر دسته بندی شده است:

```
src/
  components/
    Canvas.js          
    Header.js          
    ShapeCounter.js    
    Sidebar.js         
  App.js               
  App.css              
```

## توضیحات کامپوننت‌ها

### 1.فایل **Canvas.js**

کامپوننت `Canvas` ناحیه‌ای است که کاربران می‌توانند اشکال را بر روی آن قرار دهند. این کامپوننت مسئولیت قرار دادن اشکال بر روی canvas و جلوگیری از خروج آنها از محدوده canvas را دارد.

- تابع **handleDrop**: این تابع هنگام رها کردن یک شکل اجرا می‌شود. موقعیت قرار گرفتن شکل محاسبه شده و از خارج شدن آن از محدوده canvas جلوگیری می‌شود.
- تابع **onDropShape**: این تابع از طرف کامپوننت والد (`App`) به کامپوننت `Canvas` ارسال شده و با فراخوانی آن، وضعیت اشکال به روزرسانی می‌شود.

```jsx
const handleDrop = (e) => {
  e.preventDefault();
  const shape = e.dataTransfer.getData("shape");
  const rect = e.target.getBoundingClientRect();
  let x = e.clientX - rect.left;
  let y = e.clientY - rect.top;

  const shapeSize = 50;

  x = Math.max(0, Math.min(x, rect.width - shapeSize));
  y = Math.max(0, Math.min(y, rect.height - shapeSize));

  onDropShape(shape, x, y);
};
```

### 2.فایل **Header.js**

کامپوننت `Header` شامل هدر برنامه است که دو دکمه برای صادر کردن و وارد کردن اشکال دارد.

- توضیح **onExport**: اشکال موجود را به یک فایل `.json` صادر می‌کند.
- توضیح **onImport**: اشکال را از یک فایل `.json` وارد می‌کند.

```jsx
<button onClick={onExport}>Export</button>
<button onClick={onImport}>Import</button>
```

### 3.فایل **ShapeCounter.js**

کامپوننت `ShapeCounter` تعداد اشکال مختلفی که روی canvas قرار گرفته‌اند را نشان می‌دهد. این کامپوننت از آیکون‌های SVG برای نمایش انواع اشکال (مربع، دایره، مثلث) استفاده می‌کند.

```jsx
const counts = shapes.reduce((acc, shape) => {
  acc[shape.type] = (acc[shape.type] || 0) + 1;
  return acc;
}, {});

return (
  <div className="shape-counter">
    {Object.entries(counts).map(([type, count]) => (
      <div key={type}>
        {type === 'Square' && <SquareIcon />}
        {type === 'Circle' && <CircleIcon />}
        {type === 'Triangle' && <TriangleIcon />}
        {count}
      </div>
    ))}
  </div>
);
```

### 4.فایل **Sidebar.js**

کامپوننت `Sidebar` نوار ابزاری است که شامل اشکال قابل کشیدن است. هر زمان که یک شکل کشیده می‌شود، تابع `onSelect` از والد (کامپوننت `App`) فراخوانی می‌شود تا نشان دهد کدام شکل برای کشیدن انتخاب شده است.

```jsx
{shapes.map((shape) => (
  <div
    key={shape.type}
    draggable
    onDragStart={(e) => {
      e.dataTransfer.setData("shape", shape.type);
      onSelect(shape.type);
    }}
  >
    {shape.icon}
  </div>
))}
```

### 5.فایل **App.js**

کامپوننت `App` ریشه‌ی اپلیکیشن است که وضعیت برنامه را مدیریت می‌کند. این کامپوننت شامل توابع مختلف برای انتخاب شکل، قرار دادن شکل بر روی canvas، حذف شکل و صادر کردن و وارد کردن اشکال است.

- توضیح **handleSelect**: شکل انتخاب شده توسط کاربر برای کشیدن را تنظیم می‌کند.
- توضیح **handleDropShape**: شکل رها شده را به وضعیت `shapes` اضافه می‌کند.
- توضیح **handleDeleteShape**: یک شکل را از canvas حذف می‌کند.
- توضیح **handleExport**: اشکال را به صورت یک فایل `json.` صادر می‌کند.
- توضیح **handleImport**: اشکال را از یک فایل `json.` وارد می‌کند.

```jsx
const handleExport = () => {
  const data = JSON.stringify(shapes);
  const blob = new Blob([data], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'drawing.json';
  a.click();
};

const handleImport = () => {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json';
  input.onchange = e => {
    const reader = new FileReader();
    reader.onload = () => {
      setShapes(JSON.parse(reader.result));
    };
    reader.readAsText(e.target.files[0]);
  };
  input.click();
};
```

## طراحی App.css

اجزای اصلی شامل:

- بخش **Canvas**: در canvas که با یک پس‌زمینه سفید و سایه طراحی شده است.
- بخش **Sidebar**: نوار ابزاری که اشکال قابل کشیدن را شامل می‌شود و افکت‌های هاور برای تعامل بیشتر با کاربر دارد.
- بخش **Shape Counter**: تعداد اشکال را در یک طرح تمیز و مرتب نمایش می‌دهد.

```css
.canvas {
  width: 600px;
  height: 400px;
  border: 2px solid #000;
  background-color: #ffffff;
  position: relative;
  cursor: crosshair;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
}
```

### واکنش‌گرایی موبایل

این اپلیکیشن دارای طراحی ریسپانسیو است. در صفحات کوچکتر از 768px، طرح به صورت ستونی نمایش داده می‌شود تا تجربه کاربری بهتری در دستگاه‌های موبایل فراهم شود.

```css
@media (max-width: 768px) {
  .main-content {
    flex-direction: column;
    gap: 20px;
  }

  .sidebar {
    width: 100%;
  }

  .canvas {
    width: 90%;
  }

  .main-content > div {
    border-right: none;
  }
}
```

## موارد استفاده از هوش مصنوعی

برای محتوای فایل App.css، برای محتوای بخش های مختلف کامپوننت ها کمک گرفته شده تا بهتر و راحت تر بتوان خروجی را با طراحی بهتر نمایش داد. برتری استفاده از هوش مصنوعی نسبت به سرچ در گوگل این است که زودتر و کاملتر می توان به خواسته خود برسیم.
