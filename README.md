## pbjs.getHighestCpmBids - pbjs.onEvent('bidResponse') - pbjs.onEvent('bidWon')

* getHighestCpmBids - повертає масив переможців після завершення аукціону;
* pbjs.onEvent('bidResponse') - Спрацьовує кожен раз, коли будь-який bidder відправляє ставку;
* pbjs.onEvent('bidWon', callback) - Після того, як ставка виграла аукціон і Prebid вже відрендерив рекламу;

Щоб відрендирити рекламу, потрібно використовувати getHighestCpmBids, адже саме цей методж поверне нам масив переможців.

pbjs.onEvent('bidWon') та pbjs.onEvent('bidResponse') краще викристовувати для логування або для іншої бізнес логіки.

## Чому pbjs.onEvent('bidWon', callback) не можна рендирити? 
Цей івент емітиться тоді коли ми вже рекламу відрендирили: pbjs.renderAd(doc, bid.adId);.
Звідси він підійде тільки для post-render логіки чи аналітики

### Приклад 
Якщо ми маємо 3 рекламні блоки і 2 бідера на кожний то ми побачимо
* 3 переможці в getHighestCpmBids
* 6 bidResponse
* 3 bidWon - останій після рендерингу