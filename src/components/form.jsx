import React from "react";
import  "./styles/form.scss";

export const Form = () => {
    return (
        <section className="conatct">
            <div className="container contact__inner" >
                <h2 className="bar contact__title">CONTACT <span>FORM</span></h2>
                <form className="formrun" action="https://form.run/api/v1/r/f3cxr7xpvt4gwmqmzjeb3f3v" method="post">
                    {/* ↓自由に要素を追加・編集することができます */}
                    <div className="form__item">
                        <label>お名前</label>
                        <input name="お名前" type="text" />
                    </div>

                    <div className="form__item">
                        <label>メールアドレス [必須]</label>
                        <input name="メールアドレス" type="email" data-formrun-type="email" data-formrun-required />
                        <div data-formrun-show-if-error="メールアドレス">メールアドレスを正しく入力してください</div>
                    </div>

                    <div className="form__item">
                        <label>お問い合わせ [必須]</label>
                        <textarea name="お問い合わせ" rows="12" data-formrun-required></textarea>
                        <div data-formrun-show-if-error="お問い合わせ">お問い合わせ入力してください</div>
                    </div>

                    <div className="form__item">
                        <label><input type="checkbox" name="個人情報利用同意" data-formrun-required />個人情報利用同意 [必須]</label>
                        
                        <div data-formrun-show-if-error="個人情報利用同意">同意してください</div>
                    </div>

                    {/* ボット投稿をブロックするためのタグ */}
                    <div className="_formrun_gotcha">
                        <label htmlFor="_formrun_gotcha">If you are a human, ignore this field</label>
                        <input type="text" name="_formrun_gotcha" id="_formrun_gotcha" tabIndex="-1" />
                    </div>

                    <button type="submit" data-formrun-error-text="未入力の項目があります" data-formrun-submitting-text="送信中...">送信</button>
                </form>
            </div>
        </section>
    )
}