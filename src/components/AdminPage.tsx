import { useEffect, useRef, useState, type ChangeEvent, type Dispatch, type FormEvent, type SetStateAction } from "react";
import type { Product } from "../types";
import { loadProductsFromStorage, saveProductsToStorage } from "../utils/productStorage";

const ADMIN_USERNAME_HASH = "a976f832cdfd9a94ddc319e9e8a4b425cc83dce19efab3a9a935f29dbcff859b";
const ADMIN_PASSWORD_HASH = "a832c694e588ae0bcc01bccd0e86773f5d33e4acc900a9dc87d0d589dfbb14b2";
const ADMIN_AUTH_SESSION_KEY = "mebelak.admin.authenticated";

interface AdminPageProps {
  authenticated: boolean;
  onAuthenticate: () => void;
  onLogout: () => void;
  onBack: () => void;
  products: Product[];
  setProducts: Dispatch<SetStateAction<Product[]>>;
}

async function hashText(value: string) {
  const data = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function createEmptyProduct(): Product {
  return {
    id: Date.now(),
    name: "",
    category: "",
    price: 0,
    rating: 0,
    reviews: 0,
    imgs: [""],
    colors: [{ name: "", hex: "#000000" }],
    fabrics: [""],
    sizes: [""],
    description: "",
    specs: [{ label: "", value: "" }],
  };
}

export function AdminPage({ authenticated, onAuthenticate, onLogout, onBack, products, setProducts }: AdminPageProps) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(ADMIN_AUTH_SESSION_KEY) === "true") {
      onAuthenticate();
    }
  }, [onAuthenticate]);

  useEffect(() => {
    if (authenticated) {
      const stored = loadProductsFromStorage();
      if (stored) {
        setProducts(stored);
      }
    }
  }, [authenticated, setProducts]);

  useEffect(() => {
    if (authenticated) {
      saveProductsToStorage(products);
    }
  }, [authenticated, products]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const [loginHash, passwordHash] = await Promise.all([hashText(login.trim()), hashText(password)]);

    if (loginHash === ADMIN_USERNAME_HASH && passwordHash === ADMIN_PASSWORD_HASH) {
      setError("");
      sessionStorage.setItem(ADMIN_AUTH_SESSION_KEY, "true");
      onAuthenticate();
      return;
    }

    setError("Неверный логин или пароль");
  };

  const validateProduct = (product: Product) => {
    const errors: string[] = [];
    if (!product.name.trim()) {
      errors.push("Название не может быть пустым");
    }
    if (!product.category.trim()) {
      errors.push("Категория не может быть пустой");
    }
    if (product.price <= 0) {
      errors.push("Цена должна быть больше 0");
    }
    if (!product.imgs.some((img) => img.trim())) {
      errors.push("Добавьте хотя бы одно изображение");
    }
    return errors;
  };

  const updateEditField = (field: keyof Product, value: any) => {
    if (!editProduct) return;
    setEditProduct({ ...editProduct, [field]: value });
  };

  const createCloneForEdit = (product: Product): Product => ({
    ...product,
    imgs: [...product.imgs],
    colors: product.colors.map((color) => ({ ...color })),
    fabrics: [...product.fabrics],
    sizes: [...product.sizes],
    specs: product.specs.map((spec) => ({ ...spec })),
  });

  const handleSaveProduct = () => {
    if (!editProduct) {
      return;
    }

    const errors = validateProduct(editProduct);
    if (errors.length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors([]);

    if (isEditing) {
      setProducts((prev) => prev.map((item) => (item.id === editProduct.id ? editProduct : item)));
    } else {
      setProducts((prev) => [editProduct, ...prev]);
    }

    setEditProduct(null);
    setIsEditing(false);
  };

  const handleDeleteProduct = (id: number) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
    if (editProduct?.id === id) {
      setEditProduct(null);
      setIsEditing(false);
    }
  };

  const handleEditProduct = (product: Product) => {
    setEditProduct(createCloneForEdit(product));
    setIsEditing(true);
    setFormErrors([]);
  };

  const handleAddNew = () => {
    setEditProduct(createEmptyProduct());
    setIsEditing(false);
    setFormErrors([]);
  };

  const handleCancel = () => {
    setEditProduct(null);
    setIsEditing(false);
    setFormErrors([]);
  };

  const ensureArray = <T,>(array: T[], fallback: T[]): T[] => (array.length > 0 ? array : fallback);

  const addEditImage = () => {
    if (!editProduct) return;
    updateEditField("imgs", [...editProduct.imgs, ""]);
  };

  const updateEditImage = (index: number, value: string) => {
    if (!editProduct) return;
    const nextImgs = [...editProduct.imgs];
    nextImgs[index] = value;
    updateEditField("imgs", nextImgs);
  };

  const removeEditImage = (index: number) => {
    if (!editProduct) return;
    const nextImgs = editProduct.imgs.filter((_, idx) => idx !== index);
    updateEditField("imgs", ensureArray(nextImgs, [""]));
  };

  const addEditColor = () => {
    if (!editProduct) return;
    updateEditField("colors", [...editProduct.colors, { name: "", hex: "#000000" }]);
  };

  const updateEditColor = (index: number, value: { name: string; hex: string }) => {
    if (!editProduct) return;
    const nextColors = [...editProduct.colors];
    nextColors[index] = value;
    updateEditField("colors", nextColors);
  };

  const removeEditColor = (index: number) => {
    if (!editProduct) return;
    const nextColors = editProduct.colors.filter((_, idx) => idx !== index);
    updateEditField("colors", ensureArray(nextColors, [{ name: "", hex: "#000000" }]));
  };

  const addEditFabric = () => {
    if (!editProduct) return;
    updateEditField("fabrics", [...editProduct.fabrics, ""]);
  };

  const updateEditFabric = (index: number, value: string) => {
    if (!editProduct) return;
    const nextFabrics = [...editProduct.fabrics];
    nextFabrics[index] = value;
    updateEditField("fabrics", nextFabrics);
  };

  const removeEditFabric = (index: number) => {
    if (!editProduct) return;
    const nextFabrics = editProduct.fabrics.filter((_, idx) => idx !== index);
    updateEditField("fabrics", ensureArray(nextFabrics, [""]));
  };

  const addEditSize = () => {
    if (!editProduct) return;
    updateEditField("sizes", [...editProduct.sizes, "×"]);
  };

  const parseSize = (size: string) => {
    const [width, depth] = size.split(/×|x|X|х|Х/).map((part) => part.trim());
    return [width ?? "", depth ?? ""] as const;
  };

  const updateEditSize = (index: number, field: "width" | "depth", value: string) => {
    if (!editProduct) return;
    const nextSizes = [...editProduct.sizes];
    const [width, depth] = parseSize(nextSizes[index] ?? "");
    const nextValue = field === "width" ? `${value.trim()}×${depth}` : `${width}×${value.trim()}`;
    nextSizes[index] = nextValue;
    updateEditField("sizes", nextSizes);
  };

  const removeEditSize = (index: number) => {
    if (!editProduct) return;
    const nextSizes = editProduct.sizes.filter((_, idx) => idx !== index);
    updateEditField("sizes", ensureArray(nextSizes, ["×"]));
  };

  const imageInputRef = useRef<HTMLInputElement | null>(null);

  const addImagesFromFiles = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!editProduct) return;
    const files = Array.from(event.target.files ?? []);
    if (files.length === 0) return;

    const dataUrls = await Promise.all(
      files.map((file) =>
        new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            if (typeof reader.result === "string") {
              resolve(reader.result);
            } else {
              reject(new Error("Не удалось прочитать файл"));
            }
          };
          reader.onerror = () => reject(reader.error);
          reader.readAsDataURL(file);
        })
      )
    );

    updateEditField("imgs", [...editProduct.imgs, ...dataUrls]);
    event.target.value = "";
  };

  const addEditSpec = () => {
    if (!editProduct) return;
    updateEditField("specs", [...editProduct.specs, { label: "", value: "" }]);
  };

  const updateEditSpec = (index: number, value: { label: string; value: string }) => {
    if (!editProduct) return;
    const nextSpecs = [...editProduct.specs];
    nextSpecs[index] = value;
    updateEditField("specs", nextSpecs);
  };

  const removeEditSpec = (index: number) => {
    if (!editProduct) return;
    const nextSpecs = editProduct.specs.filter((_, idx) => idx !== index);
    updateEditField("specs", ensureArray(nextSpecs, [{ label: "", value: "" }]));
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#110e0b] px-6">
        <div className="w-full max-w-md rounded-[2rem] border border-white/10 bg-[#1c1813]/95 p-10">
          <h1 className="text-3xl font-semibold mb-6 text-white" style={{ fontFamily: "Playfair Display, serif" }}>
            Админ-доступ
          </h1>
          <form onSubmit={handleSubmit} className="space-y-5">
            <label className="block text-sm text-muted-foreground" style={{ fontFamily: "Inter, sans-serif" }}>
              Логин
              <input
                value={login}
                onChange={(event) => setLogin(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-transparent px-4 py-3 text-white outline-none focus:border-[#c4a35a]"
                placeholder="Введите логин"
                autoComplete="username"
              />
            </label>
            <label className="block text-sm text-muted-foreground" style={{ fontFamily: "Inter, sans-serif" }}>
              Пароль
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-transparent px-4 py-3 text-white outline-none focus:border-[#c4a35a]"
                placeholder="Введите пароль"
                autoComplete="current-password"
              />
            </label>
            {error && <p className="text-sm text-red-400" style={{ fontFamily: "Inter, sans-serif" }}>{error}</p>}
            <button
              type="submit"
              className="w-full rounded-2xl bg-[#c4a35a] px-4 py-3 text-sm font-semibold text-[#110e0b] transition-colors"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Войти
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#110e0b] text-white px-6 pt-24 pb-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-start justify-between gap-4 mb-10">
          <div>
            <h1 className="text-4xl font-semibold mb-2" style={{ fontFamily: "Playfair Display, serif" }}>
              Админ-панель
            </h1>
            <p className="text-sm text-muted-foreground" style={{ fontFamily: "Inter, sans-serif" }}>
              Управление товарами каталога. Добавляйте, редактируйте или удаляйте товары. Все изменения сохраняются в cookie/LocalStorage.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleAddNew}
              className="rounded-2xl bg-[#c4a35a] px-5 py-3 text-sm font-semibold text-[#110e0b]"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Добавить товар
            </button>
            <button
              onClick={onBack}
              className="rounded-2xl border border-white/10 px-5 py-3 text-sm font-semibold text-white"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              На главную страницу
            </button>
            <button
              onClick={onLogout}
              className="rounded-2xl border border-white/10 px-5 py-3 text-sm font-semibold text-white"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Выйти
            </button>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_420px]">
          <div className="space-y-6">
            {products.map((product) => (
              <div key={product.id} className="rounded-[2rem] border border-white/10 bg-[#1c1813]/95 p-6">
                <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold" style={{ fontFamily: "Playfair Display, serif" }}>
                      {product.name || "Без названия"}
                    </h2>
                    <p className="text-sm text-muted-foreground" style={{ fontFamily: "Inter, sans-serif" }}>
                      {product.category || "Категория не указана"}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditProduct(product)}
                      className="rounded-2xl border border-white/10 px-4 py-2 text-sm"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      Изменить
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="rounded-2xl bg-red-600/80 px-4 py-2 text-sm font-semibold text-white"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      Удалить
                    </button>
                  </div>
                </div>
                <div className="mt-4 text-sm text-muted-foreground" style={{ fontFamily: "Inter, sans-serif" }}>
                  Цена: {product.price.toLocaleString("ru-RU")} ₽
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-[#1c1813]/95 p-6">
            <h2 className="text-2xl font-semibold mb-5" style={{ fontFamily: "Playfair Display, serif" }}>
              {editProduct ? (isEditing ? "Редактировать товар" : "Новый товар") : "Выберите товар для изменения"}
            </h2>

            {editProduct ? (
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  handleSaveProduct();
                }}
                className="space-y-4"
              >
                <label className="block text-sm text-muted-foreground" style={{ fontFamily: "Inter, sans-serif" }}>
                  Название
                  <input
                    value={editProduct.name}
                    onChange={(event) => updateEditField("name", event.target.value)}
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-transparent px-4 py-3 text-white outline-none focus:border-[#c4a35a]"
                  />
                </label>
                <label className="block text-sm text-muted-foreground" style={{ fontFamily: "Inter, sans-serif" }}>
                  Категория
                  <input
                    value={editProduct.category}
                    onChange={(event) => updateEditField("category", event.target.value)}
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-transparent px-4 py-3 text-white outline-none focus:border-[#c4a35a]"
                  />
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <label className="block text-sm text-muted-foreground" style={{ fontFamily: "Inter, sans-serif" }}>
                    Цена
                    <input
                      type="number"
                      min={0}
                      value={editProduct.price}
                      onChange={(event) => updateEditField("price", Number(event.target.value))}
                      className="mt-2 w-full rounded-2xl border border-white/10 bg-transparent px-4 py-3 text-white outline-none focus:border-[#c4a35a]"
                    />
                  </label>
                  <label className="block text-sm text-muted-foreground" style={{ fontFamily: "Inter, sans-serif" }}>
                    Старая цена
                    <input
                      type="number"
                      min={0}
                      value={editProduct.oldPrice ?? ""}
                      onChange={(event) => updateEditField("oldPrice", event.target.value ? Number(event.target.value) : undefined)}
                      className="mt-2 w-full rounded-2xl border border-white/10 bg-transparent px-4 py-3 text-white outline-none focus:border-[#c4a35a]"
                    />
                  </label>
                </div>
                <label className="block text-sm text-muted-foreground" style={{ fontFamily: "Inter, sans-serif" }}>
                  Описание
                  <textarea
                    value={editProduct.description}
                    onChange={(event) => updateEditField("description", event.target.value)}
                    className="mt-2 w-full min-h-[6rem] rounded-2xl border border-white/10 bg-transparent px-4 py-3 text-white outline-none focus:border-[#c4a35a]"
                  />
                </label>

                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="text-sm text-muted-foreground" style={{ fontFamily: "Inter, sans-serif" }}>
                      Изображения
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={addEditImage}
                        className="rounded-2xl border border-white/10 px-3 py-2 text-[11px] text-muted-foreground whitespace-nowrap"
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        Добавить URL
                      </button>
                      <button
                        type="button"
                        onClick={() => imageInputRef.current?.click()}
                        className="rounded-2xl border border-white/10 px-3 py-2 text-[11px] text-muted-foreground whitespace-nowrap"
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        Загрузить файл
                      </button>
                    </div>
                  </div>
                  <input
                    ref={imageInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={addImagesFromFiles}
                  />
                  <div className="space-y-3">
                    {editProduct.imgs.map((img, index) => (
                      <div key={index} className="flex gap-3">
                        <input
                          value={img}
                          onChange={(event) => updateEditImage(index, event.target.value)}
                          className="flex-1 rounded-2xl border border-white/10 bg-transparent px-4 py-3 text-white outline-none focus:border-[#c4a35a]"
                          placeholder="URL изображения"
                        />
                        <button
                          type="button"
                          onClick={() => removeEditImage(index)}
                          className="rounded-2xl border border-red-600 px-3 py-2 text-xs text-red-300"
                          style={{ fontFamily: "Inter, sans-serif" }}
                        >
                          Удалить
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm text-muted-foreground" style={{ fontFamily: "Inter, sans-serif" }}>
                      Цвета
                    </p>
                    <button
                      type="button"
                      onClick={addEditColor}
                      className="rounded-2xl border border-white/10 px-3 py-2 text-[11px] text-muted-foreground whitespace-nowrap flex-shrink-0"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      Добавить
                    </button>
                  </div>
                  <div className="space-y-3">
                    {editProduct.colors.map((color, index) => (
                      <div key={index} className="grid grid-cols-[minmax(0,1fr)_90px_auto] gap-3 items-center">
                        <input
                          value={color.name}
                          onChange={(event) => updateEditColor(index, { ...color, name: event.target.value })}
                          className="min-w-0 rounded-2xl border border-white/10 bg-transparent px-4 py-3 text-white outline-none focus:border-[#c4a35a]"
                          placeholder="Название цвета"
                        />
                        <input
                          type="color"
                          value={color.hex}
                          onChange={(event) => updateEditColor(index, { ...color, hex: event.target.value })}
                          className="h-12 w-full rounded-2xl border border-white/10 bg-transparent px-2 py-2"
                        />
                        <button
                          type="button"
                          onClick={() => removeEditColor(index)}
                          className="flex-shrink-0 rounded-2xl border border-red-600 px-3 py-2 text-xs text-red-300"
                          style={{ fontFamily: "Inter, sans-serif" }}
                        >
                          Удалить
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm text-muted-foreground" style={{ fontFamily: "Inter, sans-serif" }}>
                      Обивка
                    </p>
                    <button
                      type="button"
                      onClick={addEditFabric}
                      className="rounded-2xl border border-white/10 px-4 py-2 text-xs text-muted-foreground"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      Добавить
                    </button>
                  </div>
                  <div className="space-y-3">
                    {editProduct.fabrics.map((fabric, index) => (
                      <div key={index} className="grid grid-cols-[minmax(0,1fr)_auto] gap-3 items-center">
                        <input
                          value={fabric}
                          onChange={(event) => updateEditFabric(index, event.target.value)}
                          className="min-w-0 rounded-2xl border border-white/10 bg-transparent px-4 py-3 text-white outline-none focus:border-[#c4a35a]"
                          placeholder="Тип обивки"
                        />
                        <button
                          type="button"
                          onClick={() => removeEditFabric(index)}
                          className="flex-shrink-0 rounded-2xl border border-red-600 px-3 py-2 text-xs text-red-300"
                          style={{ fontFamily: "Inter, sans-serif" }}
                        >
                          Удалить
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm text-muted-foreground" style={{ fontFamily: "Inter, sans-serif" }}>
                      Размеры
                    </p>
                    <button
                      type="button"
                      onClick={addEditSize}
                      className="rounded-2xl border border-white/10 px-4 py-2 text-xs text-muted-foreground"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      Добавить
                    </button>
                  </div>
                  <div className="space-y-3">
                    {editProduct.sizes.map((size, index) => {
                      const [width, depth] = parseSize(size);
                      return (
                        <div key={index} className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] gap-3 items-center">
                          <input
                            value={width}
                            onChange={(event) => updateEditSize(index, "width", event.target.value)}
                            className="min-w-0 rounded-2xl border border-white/10 bg-transparent px-4 py-3 text-white outline-none focus:border-[#c4a35a]"
                            placeholder="Ширина"
                          />
                          <input
                            value={depth}
                            onChange={(event) => updateEditSize(index, "depth", event.target.value)}
                            className="min-w-0 rounded-2xl border border-white/10 bg-transparent px-4 py-3 text-white outline-none focus:border-[#c4a35a]"
                            placeholder="Глубина"
                          />
                          <button
                            type="button"
                            onClick={() => removeEditSize(index)}
                            className="flex-shrink-0 rounded-2xl border border-red-600 px-3 py-2 text-xs text-red-300"
                            style={{ fontFamily: "Inter, sans-serif" }}
                          >
                            Удалить
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm text-muted-foreground" style={{ fontFamily: "Inter, sans-serif" }}>
                      Характеристики
                    </p>
                    <button
                      type="button"
                      onClick={addEditSpec}
                      className="rounded-2xl border border-white/10 px-3 py-2 text-[11px] text-muted-foreground whitespace-nowrap flex-shrink-0"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      Добавить
                    </button>
                  </div>
                  <div className="space-y-3">
                    {editProduct.specs.map((spec, index) => (
                      <div key={index} className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] gap-3 items-center">
                        <input
                          value={spec.label}
                          onChange={(event) => updateEditSpec(index, { ...spec, label: event.target.value })}
                          className="min-w-0 rounded-2xl border border-white/10 bg-transparent px-4 py-3 text-white outline-none focus:border-[#c4a35a]"
                          placeholder="Название"
                        />
                        <input
                          value={spec.value}
                          onChange={(event) => updateEditSpec(index, { ...spec, value: event.target.value })}
                          className="min-w-0 rounded-2xl border border-white/10 bg-transparent px-4 py-3 text-white outline-none focus:border-[#c4a35a]"
                          placeholder="Значение"
                        />
                        <button
                          type="button"
                          onClick={() => removeEditSpec(index)}
                          className="flex-shrink-0 rounded-2xl border border-red-600 px-3 py-2 text-xs text-red-300"
                          style={{ fontFamily: "Inter, sans-serif" }}
                        >
                          Удалить
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    type="submit"
                    className="rounded-2xl bg-[#c4a35a] px-5 py-3 text-sm font-semibold text-[#110e0b]"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    Сохранить
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="rounded-2xl border border-white/10 px-5 py-3 text-sm"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    Отмена
                  </button>
                </div>
              </form>
            ) : (
              <p className="text-sm text-muted-foreground" style={{ fontFamily: "Inter, sans-serif" }}>
                Выберите товар слева или нажмите «Добавить товар», чтобы создать новый.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
