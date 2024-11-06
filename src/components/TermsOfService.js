import React from 'react';
import Breadcrumb from './Breadcrumb';
import '../serviceForm.css';
import { Helmet } from 'react-helmet';


const TermsOfService = () => {

    return (
        <>
        <Helmet>
        <title>利用規約</title>
      </Helmet>
        <div className="body-2">
        <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
            <div className="mainFormService">
            <Breadcrumb className="breadcrumb" />
            <h1>ＷＥＢサイト制作業務委託および基本利用規約同意書</h1>

            <p>ストリーマーズランド（以下「乙」といいます）は、当社が提供するホームページ制作サービスおよび制作したホームページの利用並びにそれに付随する各種オプションサービス（以下「本サービス」といいます）の基本利用規約（以下「本規約」といいます）を下記条項のとおり定めます。なお、本サービスをご利用になられる方（以下「甲」といいます）は、利用申し込みの前に必ず本規約の内容を全て確認してください。申し込みを行った時点で、利用者は本規約の内容を承諾しているものとみなします。</p>

            <h3>第１条（目的）</h3>
            <p>甲は乙に対し、本業務を委託し、乙はこれを受託する。甲は、乙が本業務を遂行するに際して、必要な協力を行う。</p>

            <h3>第２条(本業務)</h3>
            <p>乙が甲に提供する業務は次の通りとする。ただし、第３条に定める仕様書において本契約と異なる事項を定めた場合は、その部分について仕様書を優先する。</p>
            <p>（１）甲から提供されるテキスト原稿、画像等、各種リンク先サイトのURL、資料データと、乙の提供するHTMLによるデザイン・レイアウトデータ、およびスクリプト等と組み合わせて、WEBサイトを制作すること。</p>

            <h3>第３条（仕様書）</h3>
            <p>（１）甲が乙に委託する本業務の具体的な名称、内容、仕様、数量、単価、金額、納期、納入形態、納入場所、支払日、支払方法等その他本業務委託に必要な事項は個別の仕様書において定める。</p>
            <p>（２）前項の仕様書については、甲が所定の発注書を乙に提出し、乙が受注書を甲に提出した時点をもって成立する。</p>
            <p>（３）甲及び乙の事情により前２項の仕様書の内容を変更する必要が生じた場合には、双方は書面をもって相手方にその旨を通知し、承諾を得るものとする。</p>

            <h3>第４条（契約期間）</h3>
            <p>本契約の有効期間は、本契約締結の日から満1年間とする。ただし期間満了の1ヶ月前までに、甲乙いずれからも何らの意思表示もないときは、本基本契約と同一条件で更に1年間延長するものとし、以後も同様とする。</p>
            <h3>第５条（制作料金）</h3>
            <p>（１）甲は納入物の対価として、乙からの請求にもとづきその制作等に関する料金及び消費税相当額を乙に支払う。</p>
            <p>（２）本契約に基づく料金額は、乙のホームページ上の料金表及び仕様書に定める通りとする。なお、乙は、ホームページ上の料金表については、告知せずに価格変更をできるものとする。</p>
            <p>（３）料金の支払条件は、納品書記載の納品日より1週間以内とし、甲は乙が指定した銀行口座に振り込みまたは指定の方法（ネット決済サービス等）で支払う。振込手数料は甲の負担とする。ただし乙が仕様書にて料金の支払い条件を別途明示している場合は、仕様書の記載を優先する。</p>

            <h3>第６条 (着手金)</h3>
            <p>乙は、第３条に定める仕様書において本契約と異なる事項を定めた場合以外は、甲による着手金の支払い後、本業務に着手する。なお乙は、着手後の着手金の返金には一切応じないものとする。</p>

            <h3>第７条（納品）</h3>
            <p>（１）乙が甲に制作物の納品を行なう前に、甲はインターネット上にてその確認を行なうものとする。</p>
            <p>（２）甲は、乙からの確認依頼通知を受領後速やかに、その内容の確認を行なう。甲から乙への確認通知は確認依頼通知への返信メール、または文書により行なう。確認依頼通知の受領後７日以内に乙宛への連絡が無い場合は、甲により制作物の内容が承認されたものとみなす。</p>
            <p>（３）甲が制作完了後の更新や修正を希望する場合は、乙規定の方法で知らせる。</p>

            <h3>第８条(公開)</h3>
            <p>乙は、甲による委託料金の完済後、制作物を公開するものとする。なお公開後、制作物に掲載された内容に関しては、乙は一切の責任を負わないものとする。</p>

            <h3>第９条（利用者情報の取扱い）</h3>

            <h3>1. 目的の範囲</h3>
            <p>当社は、利用者情報を、本サービスの提供、円滑な運営、および必要な範囲で使用するものとします。</p>

            <h3>2. 第三者提供</h3>
            <p>当社は、利用者情報を、以下の場合を除き、第三者に提供しないものとします。</p>

            <h3>3. 利用者の権利</h3>
            <p>利用者は、当社に対して、自己の情報の開示、訂正、利用停止等を請求する権利を有します。</p>

            <h3>第１０条（損害賠償）</h3>

            <h3>1. 免責事項</h3>
            <p>当社は、本サービスの利用により生じた損害について、当社の責に帰すべき事由がない限り、賠償責任を負わないものとします。</p>

            <h3>2. 損害賠償額の制限</h3>
            <p>当社の損害賠償責任は、利用者が当社に支払った金額を上限とします。</p>

            <h3>第１１条（反社会的勢力の排除）</h3>

            <h3>1. 反社会的勢力の非関与</h3>
            <p>利用者は、反社会的勢力に関与しないことを誓約します。</p>
            <h3>第１２条（契約の解除）</h3>

            <h3>1. 解除の権利</h3>
            <p>当社および利用者は、相手方が本規約に違反した場合、契約を解除することができます。</p>

            <h3>2. 通知</h3>
            <p>契約を解除する場合、事前に書面で通知を行うものとします。</p>

            <h3>第１３条（知的財産権）</h3>

            <h3>1. 知的財産権の帰属</h3>
            <p>本サービスに関する知的財産権は、全て当社または正当な権利を有する第三者に帰属します。</p>

            <h3>第１４条（秘密保持）</h3>

            <h3>1. 秘密情報の取扱い</h3>
            <p>当社および利用者は、相手方の秘密情報を第三者に開示してはなりません。</p>

            <h3>第１５条（準拠法および管轄裁判所）</h3>

            <h3>1. 準拠法</h3>
            <p>本規約の準拠法は日本法とします。</p>

            <h3>2. 管轄裁判所</h3>
            <p>本規約に関する紛争は、東京地方裁判所を専属的合意管轄裁判所とします。</p>

            <h3>第１６条（不可抗力）</h3>

            <h3>1. 免責事項</h3>
            <p>天災、法令の改廃、労働争議などの不可抗力による本サービスの停止・中断について、当社は一切責任を負いません。</p>

            <h3>第１７条（本規約の変更）</h3>

            <h3>1. 規約の改定</h3>
            <p>当社は、必要に応じて本規約を変更することができ、変更後の内容は当社が別途定める方法により通知します。</p>

            <h3>第１８条（譲渡禁止）</h3>

            <p>利用者は、当社の書面による承諾なく、本契約上の地位や権利義務を第三者に譲渡することはできません。</p>

            <h3>第１９条（分離可能性）</h3>

            <p>本規約のいずれかの条項が無効または執行不能と判断された場合でも、その他の条項は継続して有効とします。</p>

            <h3>第２０条（本規約の解釈）</h3>

            <p>本規約の解釈に疑義が生じた場合は、日本語の条文を基準とし、当社が解釈を行うものとします。</p>

            <h3>第２１条（協議）</h3>

            <p>本規約に定めのない事項や解釈に疑義が生じた場合、当社と利用者は誠意をもって協議の上解決するものとします。</p>
            </div>
            </div>
            </div>
            </>
    );
};

export default TermsOfService;