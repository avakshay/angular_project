from django.urls    import path

from . import views

urlpatterns = [
    path('cricket_data/<id>', views.cricket_data),
    path('match_odds/', views.match_odds),
    path('current/', views.userdetails),
    path('user_curr_balance/', views.userCurrentBalanceWithExposure),
    path('login/', views.login),
    path('casino_transac/',views.casino_transac),
    path('maxmin_bet_limit/',views.maxmin_bet_limit),
    path('fancy_position/',views.fancy_position),
    path('userbetslist/',views.userbets),
    path('user_profit_loss/',views.user_profit_loss),
    # path('user_expo/',views.user_expo),
    path('user_expo/',views.UserExpo.as_view()),
    path('distribution/', views.distribution),
    path('casinotransactions', views.casinotransactions),

]