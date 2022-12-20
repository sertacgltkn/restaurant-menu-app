import React, { createContext, useContext, useEffect, useState } from "react";

const Context = createContext({   // bir uygulamada birden fazla komponent arasında veri paylaşımı yapılması gerekiyorsa, bunun yerine props (özellikler) kullanılarak veri aktarmak yerine, Context kullanılabilir. Bu sayede, verinin tüm komponentlerde aynı anda güncellenmesi sağlanır ve veri yönetimi kolaylaşır.
	state: {},
	updateFromCart: (item) => {},
	addToCart: (item) => {},
  	hasShoppingCart: (item) => { },
	getCartCount: () => 0,
	/**
	 * 
	 * @param {number} id 
	 */
	removeFromCart: (id) => { },
	removeCartItems: () => {}
});

export const useShoppingCart = () => useContext(Context); // her componentte kullanabilmek için export edilen context. Global state

export const CartProvider = ({ children, initialState = {}}) => {
  const [state, setState] = useState(initialState);
  useEffect(() => {
    window.localStorage.setItem("cart", JSON.stringify(state))
  }, [state])

	const addToCart = (item) => {
		setState((prev) => {
			return { ...prev, [item.id]: { quantity: 1 } }; //  bu öğeyi sepete eklemek için bir öğe nesnesi alır. Öğe nesnesinin bir 'id' özelliği vardır ve ekleme işlevi, öğe nesnesini sepete eklemek için öğenin 'id' özelliğini kullanır.
		});
	};

	/// jsdoc
	/**
	 *
	 * @param {any} item
	 * @param {"minus" | "plus"} type
	 * @returns
	 */
	const updateFromCart = (item, type) => {  // sepetten bir öğe güncelleme (arttırma)
		if (type === "plus") {
			setState((prev) => {
				prev[item.id].quantity++;
				return { ...prev };
			});
			return;
		}
		if (type === "minus") {       // // sepetten bir öğe güncelleme (azaltma)
			setState((prev) => {
				if (prev[item.id].quantity > 1) {
					prev[item.id].quantity--;
				} else {
					delete prev[item.id];
				}
				return { ...prev };
			});
		}
	};

	const hasShoppingCart = (item) => { // id'ye bakarak spette mi değil mi ona bakılır. sonuç boolean
		return state[item.id] ? true : false;
	};

	const getCartCount = () => {   // sepetteki toplam öğe sayısı kaç onu görmek için
		let count = 0;
		Object.keys(state).forEach((id) => {  // Object Constructor, JavaScript dilinde bir global fonksiyonudur ve yeni bir nesne oluşturmak için kullanılır. Bu fonksiyon, bir prototip nesnesi alarak veya boş bir nesne oluşturarak yeni bir nesne oluşturur.
			const item = state[id];  // object.keys fonk. nesnenin id'lerini döndrürecektir.
			count += item.quantity;
		});
		return count;
	};

	const removeFromCart = id => {
		setState(prev => {
			const state = { ...prev };
			delete state[id]
			return {...state }
		})
	}

	const removeCartItems = () => {
		setState({});
	}
	return (
		<Context.Provider  
			value={{
				state,
				updateFromCart,
				addToCart,
				hasShoppingCart,
				getCartCount,
				removeFromCart,
				removeCartItems
			}}
		>
			{children}
		</Context.Provider>
	);
};
